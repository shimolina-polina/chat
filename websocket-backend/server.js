const ws = require('ws');
const { connectToDatabase } = require('./database');

const wss = new ws.Server({ 
    port: 5000, 
    verifyClient: (_info, callback) => {
        callback(true);
    }
}, () => console.log("Сервер запущен на ws://localhost:5000"));

let db;
connectToDatabase().then(database => {
    db = database;
    console.log("🔌 Подключено к MongoDB");
}).catch(err => {
    console.error("❌ Ошибка подключения к MongoDB:", err);
    process.exit(1);
});

wss.on('connection', function connection(ws) {
    console.log("Новый клиент подключился!");
    ws.on('message', async (message) => {
        try {
            const messageData = JSON.parse(message);
            console.log("Получено:", messageData)
            
            if (!messageData.event) {
                throw new Error("Нет поля 'event' в сообщении");
            }

            const usersCollection = db.collection('users');
            const messagesCollection = db.collection('messages');
            const chatsCollection = db.collection('chats');

            switch(messageData.event) {
                case "connect":
                    const user = messageData.data.user;
                    if (!user?.uid) {
                        throw new Error("Нет данных пользователя");
                    }

                    const userChats = await chatsCollection.find({ userIds: user.uid}).toArray();

                    const chatsWithMessages = await Promise.all(
                        userChats.map(async chat => {
                            const messages = (await messagesCollection.find({ 
                                chatId: chat.chatId
                            }).sort({ timestamp: 1 }).limit(50).toArray()).map(mes => ({
                                id: mes.id, 
                                chatId: mes.chatId, 
                                sender: mes.sender, 
                                text: mes.text, 
                                timestamp: mes.timestamp
                            }));
                            
                            return { ...chat, messages };
                        })
                    );

                    ws.send(JSON.stringify({
                        event: 'chats',
                        data: chatsWithMessages
                    }));

                    break;
                case 'message':
                    if (!messageData.data?.chatId || !messageData.data.sender) {
                        throw new Error("Неверный формат сообщения");
                    }
                    await messagesCollection.insertOne({
                        id: messageData.data.id,
                        chatId: messageData.data.chatId,
                        sender: messageData.data.sender,
                        text: messageData.data.text,
                        timestamp: new Date()
                    });

                    const currentUser = await usersCollection.find({ uid: messageData.data.sender.uid }).toArray();
                    if (currentUser.length === 0)
                        await usersCollection.insertOne({
                            uid: messageData.data.sender.uid,
                            email: messageData.data.sender.email,
                            photoURL: messageData.data.sender.email
                    })
                    broadcastMessage(messageData)
                    break;
                default:
                    console.warn("Неизвестное событие:", messageData.event);

            }
        } catch (err) {
            console.error("Ошибка обработки сообщения:", err);
            ws.send(JSON.stringify({ 
                event: 'error', 
                data: err.message 
            }));
        }
    });

    ws.on('close', () => {
        console.log("Клиент отключился");
    })
});


function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}
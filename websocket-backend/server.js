const ws = require('ws');
const { connectToDatabase } = require('./database');

const wss = new ws.Server({ port: 5000, }, () => console.log("Сервер запущен на 5000"));

wss.on('connection', function connection(ws) {
    ws.on('message', async (message) => {
        const messageData = JSON.parse(message);
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        switch(messageData.event) {
            case 'message':
                const messagesCollection = db.collection('messages');

                const user = JSON.parse(messageData.sender)

                await messagesCollection.insertOne({
                    id: messageData.id,
                    chatId: messageData.chatId,
                    senderId: user.uid,
                    text: messageData.text,
                    timestamp: new Date(),
                    event: 'message'
                });

                const currentUser = await usersCollection.find({ uid: user.uid }).toArray();
                if (currentUser.length === 0)
                    await usersCollection.insertOne({
                        uid: user.uid,
                        email: user.email,
                        photoURL: user.email
                })
                broadcastMessage(messageData)
                break;
            case 'openChat':
                const chatMessages = await getChatMessages(messageData.chatId);
                let messages = []
                for (const mes of chatMessages) {
                    const curUser = await usersCollection.findOne({ uid: mes.senderId });
                    if (curUser) {
                        messages.push({
                            id: mes.id,
                            chatId: mes.chatId,
                            sender: JSON.stringify({
                                uid: curUser.uid,
                                email: curUser.email,
                                photoURL: curUser.photoURL,
                            }),
                            text: mes.text,
                            timestamp: mes.timestamp
                        });
                    }
                }

                ws.send(JSON.stringify({
                    event: 'chatHistory',
                    messages: messages,
                }));
                break;
        
        }
    });
});


function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

async function getChatMessages(chatId, limit = 50) {
    const db = await connectToDatabase();
    const messagesCollection = db.collection('messages');
    // const messages = await messagesCollection
    //     .find({ chatId: chatId })
    //     .sort({ timestamp: -1 })
    //     .limit(limit)
    //     .toArray()
    //     .reverse();

    const messages = await messagesCollection.find({ chatId: chatId}).toArray();
    console.log(messages)
    return messages;
}

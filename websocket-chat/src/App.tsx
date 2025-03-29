import { useSelector } from 'react-redux';
import Chat from './components/Chat';
import Layout from './components/Layout';
import { RootState } from './store/store';
import { useEffect, useRef, useState } from 'react';
import { SocketService } from './services/socketService';
import { Grid2, Typography } from '@mui/material';
import ChatList from './components/ChatList';
import { IChat } from './interface/IChat';
import { IMessage } from './interface/IMessage';
import { IUser } from './interface/IUser';


function App() {
    const { user } = useSelector((state: RootState) => state.auth);
    const socketService = useRef<SocketService | null>(null);
    const [connected, setConnected] = useState(false);
    const [chats, setChats] = useState<IChat[]>([]);
    const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
    const [newMessage, setNewMessage] = useState<IMessage | null>(null);
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (user) {
            socketService.current = new SocketService("ws://localhost:5000");

            socketService.current.connect(
                {uid: user?.uid, email: user?.email, photoURL: user?.photoURL}, 
                () => {
                    setConnected(true);
                }
            );
            
    
            const handleMessage = (message: any) => {
                switch (message.event) {
                    case "chats":
                        const chatList: IChat[] = message.data.map((item: any) => ({type: item.type, title: item.title, chatId: item.chatId, messages: item.messages}))
                        setChats(chatList)
                        break;
                    case "message":
                        const tempNewMessage: IMessage = {     
                            id: message.data.id,
                            chatId: message.data.chatId,
                            sender: message.data.sender,
                            text: message.data.text,
                            timestamp: message.data.timestamp,
                        };
                        setNewMessage(tempNewMessage);
                        break;
                    case "users":
                        setUsers(message.data);
                        
                }
            };
            socketService.current.onMessage(handleMessage);
    
            return () => {
                socketService.current?.disconnect();
            };
    
        }

    }, [user]);
    

    return (
        <Layout>
            {!connected && 
                <>
                    <Typography>Вы не подключены</Typography>
                </>
            }
            <Grid2 container>
                <Grid2 size={2}>
                    {user && <ChatList chats={chats} setSelectedChat={setSelectedChat} socket={socketService.current} users={users}/>}
                </Grid2>
                <Grid2 size={10}>
                    {user && <Chat socket={socketService.current} selectedChat={selectedChat} newMessage={newMessage}/>}
                </Grid2>
            </Grid2>
        </Layout>
    );
}

export default App;
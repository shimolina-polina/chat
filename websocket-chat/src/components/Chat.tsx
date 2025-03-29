import { FC, useEffect, useRef, useState } from "react";
import { IMessage } from "../interface/IMessage";
import Message from "./Message";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import InputField from "./InputField";
import { Box } from "@mui/material";
import { SocketService } from "../services/socketService";
import { IChat } from "../interface/IChat";

const Chat: FC<{socket: SocketService | null, selectedChat: IChat | null, newMessage: IMessage | null}> = ({socket, selectedChat, newMessage}) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const { user } = useSelector((state: RootState) => state.auth);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const tempMessages = selectedChat?.messages;
        console.log(tempMessages)
        if (tempMessages) setMessages(tempMessages)
    }, [selectedChat])

    useEffect(() => {
        if (!user || !socket) return;
        
        if(newMessage != null) {
            setMessages((prev) => {
            const isDuplicate = prev.some((item) => item.id === newMessage.id);
                return isDuplicate ? prev : [...prev, newMessage];
            });
        }

    }, [newMessage]);
      
    return (
        <Box>
            <Box
                sx={{
                    height: '550px',
                    overflowY: 'auto',
                    marginY: 1,
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1, 
                    padding: 2,
                    flexGrow: 1
                }}>
                {messages.map(item => (
                    <Message key={item.id} me={item.sender.uid === user?.uid} message={item.text} messageId={item.id} username={item?.sender.email?.split("@")[0]}/>
                ))}
                <div ref={messagesEndRef} />
            </Box>
            <InputField socket={socket} chatId={selectedChat?.chatId}/>
        </Box>
    );
}

export default Chat;
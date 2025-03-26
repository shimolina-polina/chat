import { useEffect, useRef, useState } from "react";
import { IMessage } from "../interface/IMessage";
import Message from "./Message";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import InputField from "./InputField";
import { Box, Typography } from "@mui/material";

const Chat = () => {
      const socket = useRef<WebSocket | null>(null);
      const [connected, setConnected] = useState(false);
      const [messages, setMessages] = useState<IMessage[]>([]);
      const { user } = useSelector((state: RootState) => state.auth);
      const messagesEndRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

      useEffect(() => {
        socket.current = new WebSocket('ws://localhost:5000')
  

        socket.current.onopen = () => {
          setConnected(true)

          socket.current?.send(JSON.stringify({
            event: 'openChat',
            chatId: 1,
          }));
  
        }

        socket.current.onmessage = (event) => {
          const message = JSON.parse(event.data)

          switch (message.event) {
            case 'message':
              const user = JSON.parse(message.sender);

              const newMessage: IMessage = {...message, sender: user}

              setMessages((prev) => {
                const isDuplicate = prev.some((item) => item.id === message.id);
                if (isDuplicate) {
                  return prev;
                }
                return [...prev, newMessage];
              });

              break;

            case 'chatHistory':
              const history: IMessage[] = message.messages.map((item: any) => ({id: item.id, chatId: item.chatId, sender: JSON.parse(item.sender), text: item.text, timestamp: item.timestamp}))
              console.log("Chat history received:", history);

              setMessages(history)
          }
        }

  
        socket.current.onclose = () => {
          console.log('Соединение закрыто')
        }
        socket.current.onerror= () => {
    
        }
    
      }, []);
      
    if (!connected) return <Typography>Вы не подключены</Typography>

    return (
        <>
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
              }}
            >
              {messages.map(item => (
                  <Message key={item.id} me={item.sender.uid === user?.uid} message={item.text} messageId={item.id} username={item?.sender.email?.split("@")[0]}/>
              ))}
              <div ref={messagesEndRef} />
            </Box>
            <InputField socket={socket}/>
        </>
    );
}

export default Chat;
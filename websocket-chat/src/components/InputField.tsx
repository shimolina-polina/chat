import { Box, TextField, IconButton } from "@mui/material";
import { FC, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { SocketService } from "../services/socketService";

interface IInputFieldProps {
    socket: SocketService | null
    chatId: string | undefined
}

const InputField: FC<IInputFieldProps> = ({socket, chatId}) => {
    const [text, setText] = useState<string>("")
    const { user } = useSelector((state: RootState) => state.auth);

    const sendMessage = () => {
        if (!text.trim() || !user || !socket) return;
        if (user) {
            const message = {
                id: Date.now(),
                chatId: chatId,
                sender: {uid: user.uid, email: user.email, photoURL: user.photoURL},
                text: text,
            }
            try {
                socket.send({event: "message", data: message});
                setText("");
            } catch (error) {
                console.error("Ошибка при отправке сообщения:", error);
            }
        }
      };

      
    return (
    <>
        <Box display="flex" sx={{padding: 2}}>
            <TextField value={text} variant="outlined" multiline maxRows={4} fullWidth sx={{marginRight: 1}} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)}/>
            <IconButton sx={{width: '60px', height: '60px'}} onClick={() => sendMessage()} disabled={!text.trim() || !user || !socket}>
              <SendIcon />
            </IconButton>
        </Box>
    </>
    );
};

export default InputField;
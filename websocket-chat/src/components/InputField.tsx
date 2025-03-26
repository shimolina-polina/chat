import { Box, TextField, IconButton } from "@mui/material";
import { FC, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface IInputFieldProps {
    socket: React.RefObject<WebSocket | null>
}

const InputField: FC<IInputFieldProps> = ({socket}) => {
    const [text, setText] = useState<string>("")
    const { user } = useSelector((state: RootState) => state.auth);

    const sendMessage = () => {
        if (user) {
            const message = {
                id: Date.now(),
                chatId: 1,
                sender: JSON.stringify({uid: user.uid, email: user.email, photoURL: user.photoURL}),
                text: text,
                event: 'message'
            }
            if (socket && socket.current) {
                try {
                    socket.current.send(JSON.stringify(message));
                    setText('');
                } catch (error) {
                    console.error('Ошибка при отправке JSON:', error);
                }
            }
        }
      };

      
    return (
    <>
        <Box display="flex" sx={{padding: 2}}>
            <TextField value={text} variant="outlined" multiline maxRows={4} fullWidth sx={{marginRight: 1}} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)}/>
            <IconButton sx={{width: '60px', height: '60px'}} onClick={() => sendMessage()}>
              <SendIcon />
            </IconButton>
        </Box>
    </>
    );
};

export default InputField;
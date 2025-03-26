import { Box, Typography } from "@mui/material";
import { FC } from "react";

  
const Message: FC<{me: boolean, message: string, username: string | null | undefined, messageId: string}> = ({me, message, username, messageId}) => {

    return (
        <Box sx={{alignSelf: me ? 'flex-end' : 'flex-start'}} id={messageId}>
            <Typography sx={{textAlign: me ? 'right' : 'left'}}>{username}</Typography>
            <Box 
                sx={{
                    padding: 2, 
                    width: 'fit-content', 
                    maxWidth: '300px', 
                    height: 'auto',
                    textAlign: me ? 'right' : 'left',
                    backgroundColor: me ? '#fed42b' : '#E4E4E4',
                    borderRadius: 2,
                    wordBreak: 'break-all'
                    }}>
                <Typography>
                    {message}
                </Typography>
            </Box>
        </Box>
    );
}

export default Message;
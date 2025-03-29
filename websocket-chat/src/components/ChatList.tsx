import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { Dispatch, FC } from "react"
import { IChat } from "../interface/IChat";
const ChatList: FC<{chats: IChat[]; setSelectedChat: Dispatch<React.SetStateAction<IChat | null>>}> = ({chats, setSelectedChat}) => {

    const handleChooseChat = (chat: IChat) => {
        setSelectedChat(chat)
    }

    return (
        <Box sx={{marginY: 1}}>
            <Typography sx={{fontWeight: 500, fontSize: 20 }}>Мои чаты</Typography>
            <List>
                {chats.map((item: IChat) => 
                    (<ListItem key={item.chatId} sx={{padding: 0}}>
                        <ListItemButton onClick={() => handleChooseChat(item)}>
                            <ListItemText primary={item.title}/>
                        </ListItemButton>
                    </ListItem>))}
            </List>
        </Box>
    )
}

export default ChatList
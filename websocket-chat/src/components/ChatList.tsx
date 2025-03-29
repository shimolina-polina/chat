import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Fade } from "@mui/material"
import { Dispatch, FC, useState } from "react"
import { IChat } from "../interface/IChat";
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

const ChatList: FC<{chats: IChat[]; setSelectedChat: Dispatch<React.SetStateAction<IChat | null>>}> = ({chats, setSelectedChat}) => {
    const [hovered, setHovered] = useState(false);
    
    const handleChooseChat = (chat: IChat) => {
        setSelectedChat(chat)
    }

    const handleCreateGroup = () => {
        console.log("Создать групповой чат");
    }

    const handleCreatePrivate = () => {
        console.log("Создать личный чат");
    }

    return (
        <Box sx={{marginY: 1}}>
            <List>
                {chats.map((item: IChat) => 
                    (<ListItem key={item.chatId} sx={{padding: 0.5}}>
                        <ListItemButton 
                            onClick={() => handleChooseChat(item)}
                            sx={{
                                borderRadius: 2,
                                backgroundColor: 'grey.100',
                                '&:hover': {
                                    backgroundColor: 'grey.200'
                                }
                            }}
                        >
                            <ListItemText primary={item.title}/>
                            {item.type === "group" && 
                                <ListItemIcon sx={{ 
                                    minWidth: 'auto',
                                    marginLeft: 'auto'
                                }}>
                                    <GroupIcon/>
                                </ListItemIcon>
                            }
                        </ListItemButton>
                    </ListItem>))}
            </List>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                position: 'relative',
                height: 40
            }}>
                <Fade in={!hovered}>
                    <IconButton 
                        onMouseEnter={() => setHovered(true)}
                        sx={{ 
                            position: 'absolute',
                            backgroundColor: 'grey.100',
                            '&:hover': {
                                backgroundColor: 'grey.200'
                            }
                        }}
                    >
                        <AddIcon/>
                    </IconButton>
                </Fade>

                <Fade in={hovered}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                            onMouseLeave={() => setHovered(false)}
                            onClick={handleCreatePrivate}
                            sx={{ 
                                backgroundColor: 'grey.100',
                                '&:hover': {
                                    backgroundColor: 'grey.200'
                                }
                            }}
                            title="Создать личный чат"
                        >
                            <PersonIcon/>
                        </IconButton>
                        <IconButton 
                            onMouseLeave={() => setHovered(false)}
                            onClick={handleCreateGroup}
                            sx={{ 
                                backgroundColor: 'grey.100',
                                '&:hover': {
                                    backgroundColor: 'grey.200'
                                }
                            }}
                            title="Создать групповой чат"
                        >
                            <GroupIcon/>
                        </IconButton>
                    </Box>
                </Fade>
            </Box>
        </Box>
    )
}

export default ChatList
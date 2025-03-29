import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { IChat } from "../interface/IChat";
import GroupIcon from '@mui/icons-material/Group';

interface ChatItemProps {
    chat: IChat;
    onSelect: (chat: IChat) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onSelect }) => {
    return (
        <ListItem sx={{ padding: 0.5 }}>
            <ListItemButton 
                onClick={() => onSelect(chat)}
                sx={{
                    borderRadius: 2,
                    backgroundColor: 'grey.100',
                    '&:hover': {
                        backgroundColor: 'grey.200'
                    }
                }}
      >
        <ListItemText primary={chat.title}/>
            {chat.type === "group" && 
                <ListItemIcon sx={{ 
                    minWidth: 'auto',
                    marginLeft: 'auto'
                }}>
                    <GroupIcon/>
                </ListItemIcon>
            }
        </ListItemButton>
    </ListItem>
  );
};

export default ChatItem;
import { Box, List } from "@mui/material"
import { Dispatch, FC, useState } from "react"
import { IChat, ICreateChat } from "../interface/IChat";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IUser } from "../interface/IUser";
import { SocketService } from "../services/socketService";
import ChatItem from "./ChatItem";
import { AddChatButton } from "./AddChatButton";
import { GroupNamePopup } from "./GroupNamePopup";
import { UserSelectionPopup } from "./UserSelectionPopup";
import { SingleUserSelectionPopup } from "./SingleUserSelectionPopup";

interface ChatListProps {
    chats: IChat[];
    setSelectedChat: Dispatch<React.SetStateAction<IChat | null>>;
    socket: SocketService | null;
    users: IUser[];
}

const ChatList: FC<ChatListProps> = ({ 
    chats, 
    setSelectedChat, 
    socket, 
    users 
}) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [anchorElGroupName, setAnchorElGroupName] = useState<HTMLButtonElement | null>(null);
    const [anchorElUsers, setAnchorElUsers] = useState<HTMLButtonElement | null>(null);
    const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(null);
    const [newChatName, setNewChatName] = useState<string>();

    if (!socket || !user) return null;

    const handleToggleUser = (userId: string) => {
        setSelectedUsers(prev => 
        prev.includes(userId) 
            ? prev.filter(id => id !== userId) 
            : [...prev, userId]
        );
    };

    const handleCreateGroup = () => {
        if (newChatName && selectedUsers.length > 0) {
            const chat: ICreateChat = {
                sender: {uid: user.uid, email: user.email, photoURL: user.photoURL},
                type: 'group',
                title: newChatName,
                userIds: selectedUsers
            }
            socket.send({event: "createChat", data: chat});
            setAnchorElUsers(null);
            setNewChatName("");
            setSelectedUsers([]);
        }
    };

    const handleCreatePrivate = () => {
        if (selectedUser != null) {
        const chat: ICreateChat = {
            sender: {uid: user.uid, email: user.email, photoURL: user.photoURL},
            type: 'private',
            title: selectedUser,
            userIds: [user.uid]
        }
        socket.send({event: "createChat", data: chat});
        setAnchorElUser(null);
        setSelectedUser(null)
        }
    };

    return (
        <Box sx={{marginY: 1}}>
        <List>
            {chats.map(chat => (
            <ChatItem 
                key={chat.chatId} 
                chat={chat} 
                onSelect={setSelectedChat} 
            />
            ))}
        </List>
        
        <AddChatButton 
            onPrivateClick={(e) => {setAnchorElUser(e.currentTarget); socket.send({event: 'users', data: {user}});}}
            onGroupClick={(e) => setAnchorElGroupName(e.currentTarget)}
        />
        
        <GroupNamePopup
            open={Boolean(anchorElGroupName)}
            anchorEl={anchorElGroupName}
            onClose={() => setAnchorElGroupName(null)}
            onNext={() => {
                if (newChatName) {
                    setAnchorElUsers(anchorElGroupName); 
                    setAnchorElGroupName(null); 
                    socket.send({event: 'users', data: {user}});
                }
            }}
            groupName={newChatName || ''}
            setGroupName={setNewChatName}
        />
        
        <UserSelectionPopup
            open={Boolean(anchorElUsers)}
            anchorEl={anchorElUsers}
            users={users}
            selectedUsers={selectedUsers}
            onToggleUser={handleToggleUser}
            onCancel={() => {
                setAnchorElUsers(null); 
                setSelectedUsers([]); 
                setNewChatName("");
            }}
            onCreate={handleCreateGroup}
        />

        <SingleUserSelectionPopup 
            open={Boolean(anchorElUser)} 
            anchorEl={anchorElUser} 
            users={users} 
            selectedUser={selectedUser} 
            onSelectUser={(userId: string | null) => setSelectedUser(userId)}
            onCancel={() => {
                setAnchorElUser(null);
                setSelectedUser("")
            }}
            onConfirm={handleCreatePrivate}
        />
        </Box>
    );
};

export default ChatList;
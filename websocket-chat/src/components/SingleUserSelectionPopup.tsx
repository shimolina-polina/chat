import { Box, Button, List, ListItem, ListItemButton, ListItemText, Popover } from "@mui/material";
import { IUser } from "../interface/IUser";

interface SingleUserSelectionPopupProps {
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    users: IUser[];
    selectedUser: string | null;
    onSelectUser: (userId: string | null) => void;
    onCancel: () => void;
    onConfirm: () => void;
}

export const SingleUserSelectionPopup: React.FC<SingleUserSelectionPopupProps> = ({
    open,
    anchorEl,
    users,
    selectedUser,
    onSelectUser,
    onCancel,
    onConfirm
}) => {
    const handleUserClick = (userId: string) => {
        onSelectUser(selectedUser === userId ? null : userId);
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onCancel}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            sx={{'.MuiPopover-paper': {paddingX: 3, paddingY: 2, borderRadius: 2, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)'}}}
        >
            <List>
                {users.map(user => (
                    <ListItem key={user.uid} sx={{padding: 0.5}}>
                        <ListItemButton 
                            onClick={() => handleUserClick(user.uid)} 
                            selected={selectedUser === user.uid} 
                            sx={{
                                borderRadius: 1,
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(254, 212, 43, 0.16)',
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: 'rgba(254, 212, 43, 0.2)',
                                }
                            }}
                        >
                            <ListItemText primary={user.email?.split("@")[0]}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1}}>
                <Button 
                    sx={{ 
                        height: '36px',
                        borderRadius: 2, 
                        px: 3,
                        textTransform: 'none',
                        backgroundColor: 'grey.300',
                        color: 'black',
                        fontSize: '0.875rem',
                        width: '30%'
                    }}
                    onClick={onCancel}
                >
                    Отмена
                </Button>
                <Button 
                    sx={{ 
                        height: '36px',
                        borderRadius: 2, 
                        px: 3,
                        textTransform: 'none',
                        backgroundColor: '#fed42b',
                        color: 'black',
                        fontSize: '0.875rem',
                        width: '30%'
                    }}
                    onClick={onConfirm}
                >
                    Создать
                </Button>
            </Box>
        </Popover>
    );
};
import { Box, Fade, IconButton } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

interface AddChatButtonProps {
    onPrivateClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onGroupClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AddChatButton: React.FC<AddChatButtonProps> = ({ 
    onPrivateClick, 
    onGroupClick 
}) => {
    const [hovered, setHovered] = useState(false);

    return (
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
                    onClick={onPrivateClick}
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
                    onClick={onGroupClick}
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
  );
};
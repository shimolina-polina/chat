import { Box, Button, Popover, TextField } from "@mui/material";

interface GroupNamePopupProps {
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    onClose: () => void;
    onNext: () => void;
    groupName: string;
    setGroupName: (name: string) => void;
}

export const GroupNamePopup: React.FC<GroupNamePopupProps> = ({
    open,
    anchorEl,
    onClose,
    onNext,
    groupName,
    setGroupName
}) => {
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            sx={{'.MuiPopover-paper': {paddingX: 3, paddingY: 2, borderRadius: 2, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)'}}}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '300px'
            }}>
                <TextField 
                variant="standard"
                label="Название группы"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                size="small"
                sx={{
                    '& .MuiOutlinedInput-root': {
                    fontSize: '0.875rem',
                    },
                    '& .MuiInput-underline:after': {
                    borderBottomColor: '#fed42b',
                    borderBottomWidth: '2px'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                    color: '#fed42b',
                    },
                }}
                />
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
                        onClick={onClose}
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
                        onClick={onNext}
                    >
                        Далее
                    </Button>
                </Box>
            </Box>           
        </Popover>
  );
};
import { Box, Typography, Stack } from "@mui/material";
import AuthButton from "./AuthButton";

const AppBar = () => {
    return (
        <>
            <Box sx={{ display: 'flex', height: '60px', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Чат онлайн</Typography>
                </Box>
                <Stack direction="row" spacing={2} alignItems="center">
                    <AuthButton/>
                </Stack>
            </Box>
        </>
    );
}

export default AppBar;
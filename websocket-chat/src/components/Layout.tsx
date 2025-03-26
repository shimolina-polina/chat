import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import AppBar from './AppBar';

const Layout: FC<{children: ReactNode}> = ({children}) => {
    return (
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{ width: '1200px'}}>
        <AppBar/>
          <Box
              sx={{
                width: '100%',
                height: '650px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {children}
          </Box>
        </Box>
    </Box>

    );
}

export default Layout;
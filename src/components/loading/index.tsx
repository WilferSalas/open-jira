// @packages
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { FC } from 'react';

interface LoadingProps {
  size: number
}

const Loading: FC<LoadingProps> = ({ size }) => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      height: 'calc(100vh - 70px)',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={size} />
  </Box>
);

export default Loading;

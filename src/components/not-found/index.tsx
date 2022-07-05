// @package
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound: FC = () => {
  const { prefetch, push } = useRouter();

  useEffect(() => {
    prefetch('/');
  }, []);

  const handleOnRedirect = () => {
    push('/');
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          alignItems: 'center',
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 100px)',
          justifyContent: 'center',
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <ErrorOutlineIcon sx={{ fontSize: 40 }} />
          <Typography variant="h6">This page could not be found</Typography>
        </Stack>
        <Button
          onClick={handleOnRedirect}
          startIcon={<ArrowBackIcon />}
          sx={{ ml: 5 }}
        >
          Return Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;

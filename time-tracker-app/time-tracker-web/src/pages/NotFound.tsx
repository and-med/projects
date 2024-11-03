import { Container, Typography, Link } from '@mui/material';
import { Box } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container>
      <Box textAlign='center'>
        <Typography variant='h2'>Oops, nothing found here.</Typography>
      </Box>
      <Box textAlign='center'>
        <Typography>Please try to:</Typography>
        <Link sx={{ p: 1 }} component={RouterLink} to='/login'>
          Login
        </Link>
        <Typography variant='caption'>or</Typography>
        <Link sx={{ p: 1 }} component={RouterLink} to='/signup'>
          Signup
        </Link>
      </Box>
    </Container>
  );
};

export default NotFound;

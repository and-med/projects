import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLogout } from '../context/Auth';
import { Link as RouterLink } from 'react-router-dom';

const TopBar = () => {
  const onLogout = useLogout();

  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box width='100%'>
          <Button component={RouterLink} to='/dashboard' color='error'>
            <Typography variant='button' color='white'>
              Dashboard
            </Typography>
          </Button>
          <Button component={RouterLink} to='/activities' color='error'>
            <Typography variant='button' color='white'>
              Activities
            </Typography>
          </Button>
        </Box>
        <Button color='inherit' onClick={onLogout}>
          <Typography>Logout</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

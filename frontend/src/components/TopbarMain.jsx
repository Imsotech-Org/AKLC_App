import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft } from 'react-icons/sl';
import DrawerMain from './DrawerMain';

const TopbarMain = (props) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  if (!user) {
    return <></>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#879635' }}>
        <Toolbar>
          {props.backpage === 'menu' ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginLeft: '-2rem' }}>
            {props.text}
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMain
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onItemClick={(item) => {
          setDrawerOpen(false);
          navigate(item);
        }}
      />
    </Box>
  );
};

export default TopbarMain;

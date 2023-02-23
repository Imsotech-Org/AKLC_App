import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';

const TopbarUser = (props) => {

    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if(!user){
        return <></>
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: '#879635'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/plans')}
          >
            <SlArrowLeft/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginLeft: '-2rem' }}>
            {props.text}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopbarUser
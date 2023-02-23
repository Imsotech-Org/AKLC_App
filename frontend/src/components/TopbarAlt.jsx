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


const TopbarAlt = (props) => {

    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if(!user){
        return <></>
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: '#879635'}}>
        <Toolbar style={{textAlign: 'center'}}>
          

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.text}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopbarAlt
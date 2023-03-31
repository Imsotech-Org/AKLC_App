import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PublicIcon from '@mui/icons-material/Public';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { fontWeight } from '@mui/system';
import { Typography } from '@mui/material';
import '../index.css';

const DrawerMain = ({ open, onClose }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout code here
    console.log("Logout clicked");
  };

  const drawerItems = [ 
    { text: "Home", onClick: () => navigate('/') },
    { text: "Life Center Programs", onClick: () => navigate('/all-plans') },
    { text: "Longevity Network", href: "https://www.google.com" },
    { text: "Log out", onClick: handleLogout }
    //link website
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose} sx={{fontFamily: 'Josefin Sans'}}>
      <div className='drawer'>
      <List>
        <ListItemButton disabled style={{ color: 'White'}}>
          <h2>Username</h2>
        </ListItemButton>
      </List>
      <Divider />
      <List>
        {drawerItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <ListItemButton component="a" href={item.href} target="_blank" sx={{ fontFamily: 'Josefin Sans, sans-serif !important'  }}>
                
                <div className='buttonWhite'>
                    <ListItemText primary={item.text} className='buttonText'/> 
                    {/*<ListItemIcon>{item.icon}</ListItemIcon>*/}
                </div>
              </ListItemButton>
            ) : (
              <ListItemButton onClick={item.onClick} sx={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                
                <div className='buttonWhite'>
                    <ListItemText primary={item.text} />
                    {/*<ListItemIcon>{item.icon}</ListItemIcon>*/}
                </div>
              </ListItemButton>
            )}
          </React.Fragment>
        ))}
      </List>
      </div>
    </Drawer>
  );
};

export default DrawerMain;
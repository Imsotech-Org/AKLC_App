import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import {BsFillPersonFill} from 'react-icons/bs';
import {CgNotes} from 'react-icons/cg';
import {HiChatBubbleLeftRight} from 'react-icons/hi2';
import {BiNews} from 'react-icons/bi';
import {useSelector} from 'react-redux';

const Navbar = () => {
    const [value, setValue] = React.useState(0);

    const {user} = useSelector((state) => state.auth);

    const navigate = useNavigate();


    if(!user){
        return <></>
    }

    return (
        <Box fullwidth='true'>
            <BottomNavigation
                showLabels
                style={{width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#879635'}}
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}                
            >
                <BottomNavigationAction onClick={() => navigate('/')} label="Profile" icon={<BsFillPersonFill style={{width: '1.8rem', height: '1.8rem'}} />} />
                <BottomNavigationAction onClick={() => navigate('/plans')} label="Plans" icon={<CgNotes style={{width: '1.8rem', height: '1.8rem'}} />} />
                <BottomNavigationAction onClick={() => navigate('/chat')} label="Chat" icon={<HiChatBubbleLeftRight style={{width: '1.8rem', height: '1.8rem'}} />} />
                <BottomNavigationAction onClick={() => navigate('/news')} label="News" icon={<BiNews style={{width: '1.8rem', height: '1.8rem'}} />} />
            </BottomNavigation>
        </Box>
    );
}

export default Navbar
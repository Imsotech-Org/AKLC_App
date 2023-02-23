import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import nutritionIcon from '../assets/icons-logos/nutrition-icon.png';
import Topbar from '../components/Topbar';


const UserNutrition = () => {

  const {user} = useSelector((state) => state.auth);

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
    <Topbar text="My Nutrition Strategy"/>
    <div className="containerBasic">
    <div>upper navbar</div>

    <div>
      <img src={nutritionIcon} alt='Nutrition Icon' style={{width: 300, height: 300, }} />
    </div>

    <TabContext value={value}>
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Overview" value="1" />
              <Tab label="Schedule" value="2" />
          </TabList>
      </Box>
      <TabPanel value="1">Overview component</TabPanel>
      <TabPanel value="2">Schedule component</TabPanel>
    </TabContext>

    </div>
    </>
  )
}

export default UserNutrition
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getUserNutritionPlan} from '../features/nutritionPlans/nutritionSlice';
import React, {useState, useEffect, Component} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import nutritionIcon from '../assets/icons-logos/nutrition-icon.png';
import Topbar from '../components/Topbar';


const UserNutrition = () => {

  const {user} = useSelector((state) => state.auth);
  const {userNutritionPlan} = useSelector((state) => state.nutritionPlans);
  const [overViewState, setOverViewState] = useState('');
  const [scheduleState, setScheduleState] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserNutritionPlan(user._id));
    console.log('Called');
    console.log(userNutritionPlan);
    setTimeout(() => {setOverViewState('test')}, 200);
  }, [overViewState]);
  
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Topbar text="My Nutrition Strategy" backpage="/plans"/>
    <div className="containerBasic">

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
      <TabPanel value="1">{overViewState !== '' ? `${userNutritionPlan[0].overview}` : 'Overview component'}<br/></TabPanel>
      <TabPanel value="2">{overViewState !== '' ? `${userNutritionPlan[0].schedule}` : 'Schedule component'}<br/></TabPanel>
    </TabContext>

    </div>
    </>
  )
}

export default UserNutrition
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import nutritionIcon from '../assets/icons-logos/nutrition-icon.png';
import Topbar from '../components/Topbar';
import { getUserNutritionPlan } from '../features/nutritionPlans/nutritionSlice';
import { getAll } from '../features/auth/authSlice';


const UserNutrition = () => {

  const [calledOnce, setCalledOnce] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {user} = useSelector((state) => state.auth);
  const {userNutritionPlan} = useSelector((state) => state.nutritionPlans);
  
  const dispatch = useDispatch();


  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(!calledOnce){
      dispatch(getUserNutritionPlan(user._id)).then(() => setIsLoading(false));
    }
    setCalledOnce(true);
  }, [dispatch, user._id, calledOnce]);

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
      <TabPanel value="1">Overview component<br/><p>{userNutritionPlan.overview}</p> </TabPanel>
      <TabPanel value="2">Schedule component<br/><p>{userNutritionPlan.schedule}</p></TabPanel>
    </TabContext>

    </div>
    </>
  )
}

export default UserNutrition
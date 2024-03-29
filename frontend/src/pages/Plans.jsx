import { width } from '@mui/system';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUserNutritionPlan} from '../features/nutritionPlans/nutritionSlice';
import {useNavigate } from 'react-router-dom';
import fitnessIcon from '../assets/icons-logos/fitness-icon.png';
import nutritionIcon from '../assets/icons-logos/nutrition-icon.png';
import bioTracking from '../assets/icons-logos/bio-tracking-icon.png';
import TopbarMain from '../components/TopbarMain';

const Plans = () => {

  const navigate = useNavigate();
  

  const clickCardNutrition = () => {
    navigate('/user-nutrition');
  }
  const clickCardWorkouts = () => {
    navigate('/user-workouts');
  }
  const clickCardBioTracking = () => {
    navigate('/plans')
  }

  useEffect(() => {

  }, []);

  return (
    <>
    <TopbarMain text="My A+ Game"/>
    <div className="containerBasic">

      <div className="card" onClick={clickCardWorkouts}>
        <img src={nutritionIcon} alt='Nutrition Icon' style={{width: '5rem', height: '5rem', }} />
        <h1>User Workouts</h1>
      </div>

      <div className="card" onClick={clickCardNutrition}>
        <img src={fitnessIcon} alt='Fitness Icon' style={{width: '5rem', height: '5rem', }} />
        <h1>User Nutrition</h1>
      </div>

      <div className="card" onClick={clickCardBioTracking}>
        <img src={bioTracking} alt='Fitness Icon' style={{width: '5rem', height: '5rem', }} />
        <h1>Bio Tracking</h1>
      </div>

    </div>

    </>
  )
}

export default Plans
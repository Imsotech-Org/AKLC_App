import { width } from '@mui/system';
import React from 'react';
import {useNavigate } from 'react-router-dom';
import fitnessIcon from '../assets/icons-logos/fitness-icon.png';
import nutritionIcon from '../assets/icons-logos/nutrition-icon.png';

const Plans = () => {

  const navigate = useNavigate();
  const clickCardNutrition = () => {
    navigate('/user-nutrition');
  }
  const clickCardWorkouts = () => {
    navigate('/user-workouts');
  }

  return (
    <div>

    <div className="containerBasic">
      
      <div>Plans</div>

      <div className="card" onClick={clickCardWorkouts}>
        <img src={nutritionIcon} alt='Nutrition Icon' style={{width: '5rem', height: '5rem', }} />
        <h1>User Workouts</h1>
      </div>

      <div className="card" onClick={clickCardNutrition}>
        <img src={fitnessIcon} alt='Fitness Icon' style={{width: '5rem', height: '5rem', }} />
        <h1>User Nutrition</h1>
      </div>

    </div>

    </div>
  )
}

export default Plans
import React from 'react';
import {useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';

const UserWorkouts = () => {
  return (
    <>
    <Topbar text="My Workout Strategy" backpage="/plans"/>
    <div className="containerBasic">

      {/*make function with component instead?*/}
      <div className="workoutCard">
        <h3>Monday</h3>
        <p>lorem ipsum</p>
      </div>

      <div className="workoutCard">
        <h3>Tuesday</h3>
      </div>

      <div className="workoutCard">
        <h3>Wednesday</h3>
      </div>

      <div className="workoutCard">
        <h3>Thrursday</h3>
      </div>

      <div className="workoutCard">
        <h3>Friday</h3>
      </div>

      <div className="workoutCard">
        <h3>Saturday</h3>
      </div>

      <div className="workoutCard">
        <h3>Sunday</h3>
      </div>
    
    
    </div>
    </>
  )
}

export default UserWorkouts
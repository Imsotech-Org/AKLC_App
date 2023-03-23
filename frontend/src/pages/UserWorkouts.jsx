import React, {useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import {useSelector, useDispatch} from 'react-redux';
import {getWorkoutPlanByUser} from '../features/workoutPlans/workoutSlice';

const UserWorkouts = () => {

  const {user} = useSelector((state) => state.auth);
  const {workoutPlanByUser} = useSelector((state) => state.workoutPlans);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkoutPlanByUser(user._id));
    console.log(workoutPlanByUser);
  }, []);
  return (
    <>
    <Topbar text="My Workout Strategy" backpage="/plans"/>
    <div className="containerBasic">
      
      {
        workoutPlanByUser.map((item) => <div className="workoutCard">
        <h3>{item.weekday}</h3>
        <p>{item.title}</p>
        <p>{item.description}</p>
      </div>)
      }

      {/* make function with component instead?
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
      </div> */}
    
    
    </div>
    </>
  )
}

export default UserWorkouts
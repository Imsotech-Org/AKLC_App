import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';
import Topbar from '../components/Topbar';
import {createWorkoutPlan} from '../features/workoutPlans/workoutSlice';
import {useDispatch} from 'react-redux';

const CreateWorkoutPlan = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [workoutData, setWorkoutData] = useState({
    client: `${id}`,
    weekday: '',
    title: '',
    description: '',
  })

  const dispatch = useDispatch();

  const onChange = (e) => {
    setWorkoutData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createWorkoutPlan(workoutData));
    //toast.success('Workout Created!');
  }

  return (
    <>
    <Topbar text="Client Workout Plan" backpage={`/selected-user/${id}`}/>
    <div>
      <br/>
      <h1>Custom Workout Entry:</h1>

      <form onSubmit={onSubmit}>
        <label for="weekday">Select Day: </label>
         <select id="weekday" name="weekday" onChange={onChange}>
          <option value=""></option>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wedenesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
         </select>

        <br/><br/>
        <label htmlFor="title">
          Workout Overview: <br/>
          <input type="text" name="title" id="title" style={{width: '90%'}} className='inputGeneral' onChange={onChange}/>
        </label>
        
        <br/><br/>
        <label htmlFor="description">
          Description:<br />
          <textarea name="description" id="description" style={{width: '90%'}} className='inputGeneral' rows="10" onChange={onChange}></textarea>
        </label><br />
        
        <input type="datetime" name="datePlan" id="datePlan"  hidden/>
        
        <br/>
        <button>Complete and Submit</button>
      </form>

    </div>
    </>
  )
}

export default CreateWorkoutPlan
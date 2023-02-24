import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';
import Topbar from '../components/Topbar';

const CreateWorkoutPlan = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  return (
    <>
    <Topbar text="Client Workout Plan" backpage={`/selected-user/${id}`}/>
    <div>
      <br/>
      <h1>Custom Workout Entry:</h1>

      <form>
        <label for="weekday">Select Day: </label>
         <select id="weekday" name="weekday">
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
          <input type="text" name="title" id="title" style={{width: '90%'}} className='inputGeneral'/>
        </label>
        
        <br/><br/>
        <label htmlFor="description">
          Description:<br />
          <textarea name="description" id="description" style={{width: '90%'}} className='inputGeneral' rows="10"></textarea>
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
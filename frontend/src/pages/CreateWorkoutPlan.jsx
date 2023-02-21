import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';

const CreateWorkoutPlan = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(`/selected-user/${id}`)}><SlArrowLeft/></button>
      <h1>CreateWorkoutPlan</h1>

      <form>
        <label htmlFor="title">
          Title:<br />
          <input type="text" name="title" id="title" />
        </label><br />
        <label htmlFor="description">
          Description:<br />
          <textarea name="description" id="description" style={{width: '100%'}} rows="10"></textarea>
        </label><br />
        <input type="datetime" name="datePlan" id="datePlan" hidden />
        <button>Post</button>
      </form>

      <h1>Previous Workout Plans:</h1>

    </div>
  )
}

export default CreateWorkoutPlan
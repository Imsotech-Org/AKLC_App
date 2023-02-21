import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';

const CreateNutriotionPlan = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  return (
    <div className="containerBasic">
      <button onClick={() => navigate(`/selected-user/${id}`)}><SlArrowLeft/></button>

      <h1>CreateNutritionPlan</h1>

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

      <h1>Previous Nutrition Plans:</h1>
    </div>
  )
}

export default CreateNutriotionPlan
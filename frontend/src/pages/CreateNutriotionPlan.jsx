import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';
import Topbar from '../components/Topbar';

const CreateNutriotionPlan = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  return (
    <>
    <Topbar text="Client Nutrition Plan" backpage={`/selected-user/${id}`}/>
    <div className="containerBasic">

      <h1>Create Nutrition Plan</h1>

      <form>
       <label htmlFor="overview">
          Overview:<br />
          <textarea name="overview" id="overview" style={{width: '90%'}} className='inputGeneral' rows="10"></textarea>
        </label><br />

        <label htmlFor="schedule">
          Schedule:<br />
          <textarea name="schedule" id="schedule" style={{width: '90%'}} className='inputGeneral' rows="10"></textarea>
        </label><br />

        <input type="datetime" name="datePlan" id="datePlan" hidden />

        <button>Complete and Submit</button>
      </form>

    </div>
    </>
  )
}

export default CreateNutriotionPlan
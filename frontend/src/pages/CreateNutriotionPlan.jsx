import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';
import Topbar from '../components/Topbar';
import {createNutritionPlan} from '../features/nutritionPlans/nutritionSlice';
import {useDispatch} from 'react-redux';

const CreateNutriotionPlan = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [planData, setPlanData] = useState({
    schedule: '',
    overview: '',
    client: `${id}`,
  })

  const dispatch = useDispatch();

  const onChange = (e) => {
    setPlanData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createNutritionPlan(planData));
    //toast.success('Goal Created!');
  }

  return (
    <>
    <Topbar text="Client Nutrition Plan" backpage={`/selected-user/${id}`}/>
    <div className="containerBasic">

      <h1>Create Nutrition Plan</h1>

      <form onSubmit={onSubmit}>
       <label htmlFor="overview">
          Overview:<br />
          <textarea name="overview" id="overview" style={{width: '90%'}} className='inputGeneral' rows="10" onChange={onChange}></textarea>
        </label><br />

        <label htmlFor="schedule">
          Schedule:<br />
          <textarea name="schedule" id="schedule" style={{width: '90%'}} className='inputGeneral' rows="10" onChange={onChange}></textarea>
        </label><br />

        <input type="datetime" name="datePlan" id="datePlan" hidden />

        <button>Complete and Submit</button>
      </form>

    </div>
    </>
  )
}

export default CreateNutriotionPlan
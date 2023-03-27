import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';
import Topbar from '../components/Topbar';
import {createGoal} from '../features/goals/goalsSlice';
import {useDispatch} from 'react-redux';

const CreateGoals = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  
  const [goalData, setGoalData] = useState({
    client: `${id}`,
    goalPeriod: '',
    goalDescription: ''
  })

  const dispatch = useDispatch();

  const onChange = (e) => {
    setGoalData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createGoal(goalData));
    //toast.success('Goal Created!');
  }

  return (
    <>
    <Topbar text="Client Goals" backpage={`/selected-user/${id}`}/>
    <div>
      <br/>
      <h1>Create Goals:</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="goalPeriod">Select Goal Period: </label>
         <select id="goalPeriod" name="goalPeriod" onChange={onChange}>
          <option value="three_m">Three Month Goals</option>
          <option value="six_m">Six Month Goals</option>
          <option value="one_y">One Year Goals</option>
          <option value="eighteen_m">Eighteen Month Goals</option>
          <option value="two_y">Two Year Goals</option>
          <option value="three_y">Three Year Goals</option>
          <option value="five_y">Five Year Goals</option>
          <option value="ten_y">Ten Year Goals</option>
          <option value="fifteen_y">Fifteen Year Goals</option>
          <option value="twenty_y">Twenty Year Goals</option>
         </select>

        <br/><br/>
        <label htmlFor="goalDescription">
          Enter Goals: <br/>
          <textarea name="goalDescription" id="goalDescription" style={{width: '90%'}} className='inputGeneral' rows="10" onChange={onChange}></textarea>
        </label>
        
        <br/>
        <button>Complete and Submit</button>
      </form>

    </div>
    </>
  )
}

export default CreateGoals
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOff, reset } from '../features/auth/authSlice';
import {getProgram} from '../features/programs/programsSlice';
import TopbarMain from '../components/TopbarMain';
import {FaUserCircle} from 'react-icons/fa';
import { getUserGoals } from '../features/goals/goalsSlice';
import {getUserAge} from '../features/age/ageSlice';

const Profile = () => {
    const [calledOnce, setCalledOnce] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const {user, users, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);
    const {program} = useSelector((state) => state.programs);
    const {userGoals} = useSelector((state) => state.goals);
    const {userAge} = useSelector((state) => state.age);


    console.log(user._id);
    console.log(userAge);

    useEffect(() => {
      if(!calledOnce){
        dispatch(getProgram(user.plan));
      }
      setCalledOnce(true);
    }, [dispatch, user.plan, calledOnce]);

    const onSignOff = () => {
      dispatch(signOff());
      dispatch(reset());
      navigate('/signIn');
    };

    //fix userAge
    useEffect(() => {
      dispatch(getUserGoals(user._id));
      dispatch(getUserAge(user._id));
      console.log(userGoals);
      console.log(userAge);
      console.log(user._id)
    }, [dispatch, user._id]);



  return (
    <>
    <TopbarMain text="My Profile"/>
        
        <div className="row" style={{backgroundColor: "lightgray"}}>
          <div className='column'>
              <FaUserCircle className='col profilePicture'/>
          </div>
        
          <div className='column'>
              <p>User Name:</p>
              <h3>{user.name}</h3>
              <br/>
              <p>Chronologiocal Age: {userAge.chronologicalAge}</p>
              <p>Biological Age: {userAge.biologicalAge}</p>
          </div>
        </div>
        
        {/* 
          <p>User Email: </p>
          <h3>{user.email}</h3>
        */}

        <div className='containerBasic' style={{backgroundColor: "lightgray"}}>
        <p>User Plan:</p>
        <h3>{program.title}</h3>

        <div style={{display: "inline-block"}}>
        <button className="purpleButton" onClick={onSignOff}>Log Out</button>
        {
          user.isAdmin && <button className="purpleButton" onClick={() => navigate('/admin-pannel')}>Admin Pannel</button>
        }
        <br/>
        </div>
        </div>

        <br/>

        <div className="containerBasic">
        <h3>Health Goals</h3>
        </div>

        <hr/>
          {userGoals && userGoals.length > 0 ? (
            userGoals.map((item) => (
              <div className="containerBasicText">
                
                <h4>+{item.goalPeriod}</h4>
                <p className="goalstabs">{item.goalDescription}</p>
                <br/>
              </div>
            ))
          ) : (
            <p>No health goals found.</p>
          )}
        
        {/*Enable scroll*/}
    </>
  )
}

export default Profile
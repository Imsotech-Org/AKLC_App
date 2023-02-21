import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOff, reset } from '../features/auth/authSlice';
import {getProgram} from '../features/programs/programsSlice';

const Profile = () => {
    const [calledOnce, setCalledOnce] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const {user, users, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);
    const {program} = useSelector((state) => state.programs);

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
    }

  return (
    <div>
        <h1>Profile</h1>
        <p>User Name:</p>
        <h3>{user.name}</h3>
        <p>User Email: </p>
        <h3>{user.email}</h3>
        <p>User Plan:</p>
        <h3>{program.title}</h3>
        <button onClick={onSignOff}>Log Out</button>
        {
          user.isAdmin && <button onClick={() => navigate('/admin-pannel')}>Admin Pannel</button>
        }
    </div>
  )
}

export default Profile
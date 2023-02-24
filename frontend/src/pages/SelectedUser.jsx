import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAll } from '../features/auth/authSlice';
import {SlArrowLeft} from 'react-icons/sl';
import Topbar from '../components/Topbar';
import {getProgram} from '../features/programs/programsSlice';
import {FaUserCircle} from 'react-icons/fa';

const SelectedUser = () => {

  const {users} = useSelector((state) => state.auth);
  const {id} = useParams();

  const [calledOnce, setCalledOnce] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);
  const {program} = useSelector((state) => state.programs);

{/*
  useEffect(() => {
    if(!calledOnce){
      dispatch(getProgram(selectedUser.plan));
    }
    setCalledOnce(true);
  }, [dispatch, selectedUser.plan, calledOnce]);

  useEffect(() => {
    if(!calledOnce){
        dispatch(getAll());
    }
    setCalledOnce(true);
    for (let index = 0; index < users.length; index++) {
      if(users[index]._id === id){
        setSelectedUser(users[index]);
        dispatch(getProgram(users[index].plan));
      }
    }
}, []); 
*/}

useEffect(() => {
  // Only fetch all users once, when the component mounts
  if (!calledOnce) {
    dispatch(getAll());
  }
  setCalledOnce(true);

  // Set the selected user based on the URL parameter
  for (let index = 0; index < users.length; index++) {
    if (users[index]._id === id) {
      setSelectedUser(users[index]);
      break; // Stop the loop once the selected user is found
    }
  }
}, [dispatch, calledOnce, id, users]);

// When the selected user changes, fetch the program information for their plan
useEffect(() => {
  // Only fetch the program information once, when the selected user changes
  if (selectedUser.plan && !calledOnce) {
    dispatch(getProgram(selectedUser.plan));
    setCalledOnce(true);
  }
}, [dispatch, selectedUser.plan, calledOnce]);

  return (
    <>
    <Topbar text={"Client: " + selectedUser.name} backpage="/admin-pannel"/>
    <div className="containerBasic">
    
      <br/>
      <p>Selected User: {selectedUser.name}</p><br/>
      
      <button onClick={() => navigate(`/create-wourkout/${id}`)}>Create Workout Plan</button><br/>
      <button onClick={() => navigate(`/create-nutrition/${id}`)}>Create Nutrition Plan</button><br/>
      <button onClick={() => navigate(`/create-goals/${id}`)}>Create Client Goals</button><br/>
    </div>
    <p>User Email: </p>
        <h3>{selectedUser.email}</h3>
        <p>User Plan:</p>
        <h3>{program.title}</h3>

    </>
  )
}

export default SelectedUser
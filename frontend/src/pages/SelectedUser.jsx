import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAll } from '../features/auth/authSlice';
import {SlArrowLeft} from 'react-icons/sl';
import Topbar from '../components/Topbar';

const SelectedUser = () => {

  const {users} = useSelector((state) => state.auth);
  const {id} = useParams();

  const [calledOnce, setCalledOnce] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!calledOnce){
        dispatch(getAll());
    }
    setCalledOnce(true);
    for (let index = 0; index < users.length; index++) {
      if(users[index]._id === id){
        setSelectedUser(users[index]);
      }
    }
}, []);

  return (
    <>
    <Topbar text={"Client: " + selectedUser.name} backpage="/admin-pannel"/>
    <div className="containerBasic">
    
      <p>Selected User: {selectedUser.name}</p>
      
      <button onClick={() => navigate(`/create-wourkout/${id}`)}>Create Workout Plan</button>
      <button onClick={() => navigate(`/create-nutrition/${id}`)}>Create Nutrition Plan</button>
      <button onClick={() => navigate(`/create-goals/${id}`)}>Create Client Goals</button>
    </div>
    </>
  )
}

export default SelectedUser
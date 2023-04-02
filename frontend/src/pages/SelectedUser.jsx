import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAll } from '../features/auth/authSlice';
import {SlArrowLeft} from 'react-icons/sl';
import Topbar from '../components/Topbar';
import {getProgram} from '../features/programs/programsSlice';
import {FaUserCircle} from 'react-icons/fa';
import {createAge} from '../features/age/ageSlice';

const SelectedUser = () => {

  const {users} = useSelector((state) => state.auth);
  const {id} = useParams();

  const [calledOnce, setCalledOnce] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const [ageData, setAgeData] = useState({
    client: `${id}`,
    chronologicalAge: '',
    biologicalAge: ''
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);
  const {program} = useSelector((state) => state.programs);


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

  const onChange = (e) => {
    setAgeData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createAge(ageData));
  }

  return (
    <>
    <Topbar text={"Client: " + selectedUser.name} backpage="/admin-pannel"/>
    <div className="containerBasic">
    
      <br/>
      <p>Selected User: {selectedUser.name}</p><br/>
      
      <button className="signInButton" onClick={() => navigate(`/create-wourkout/${id}`)}>Create Workout Plan</button><br/>
      <button className="signInButton" onClick={() => navigate(`/create-nutrition/${id}`)}>Create Nutrition Plan</button><br/>
      <button className="signInButton" onClick={() => navigate(`/create-goals/${id}`)}>Create Client Goals</button><br/>
    
    <p>User Email: </p>
        <h3>{selectedUser.email}</h3>
        <p>User Plan:</p>
        <h3>{program.title}</h3><br/>

        <form style={{textAlign: 'left'}} onSubmit={onSubmit}>
            <label htmlFor="chronologicalAge">
                Chronological Age:<br />
                <input type="chronologicalAge" name="chronologicalAge" id="chronologicalAge" className="inputLogin" onChange={onChange}/>
            </label><br />
            <label htmlFor="biologicalAge">
                Biological Age:<br />
                <input type="biologicalAge" name="biologicalAge" id="biologicalAge" className="inputLogin" onChange={onChange}/>
            </label><br/><br/>
            <button className="signInButton">Update Ages</button>
        </form>
      </div>
    </>
  )
}

export default SelectedUser
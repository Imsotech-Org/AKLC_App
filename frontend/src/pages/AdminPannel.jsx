import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAll } from '../features/auth/authSlice';
import {SlArrowLeft} from 'react-icons/sl';
import Topbar from '../components/Topbar';

const AdminPannel = () => {

    const [calledOnce, setCalledOnce] = useState(false);

    const {users} = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!calledOnce){
            dispatch(getAll());
        }
        setCalledOnce(true);
    }, []);

  return (
    <>
    <Topbar text="Admin Dashboard" backpage="/"/>
    <div className="containerBasic">
        {/*<button onClick={() => navigate('/')}><SlArrowLeft/></button>*/}
        <h1>Admin Panel</h1>
        <p>Create News Feed</p>
        <button onClick={() => navigate("/create-news")}>New Feed</button>
        <p>Show All users that have plans</p>
        <ul>
            {
                users.map((item, index) => {
                    if(item.hasPaid){
                        return <li key={index} onClick={() => navigate(`/selected-user/${item._id}`)} style={{backgroundColor: 'lightgray', margin: '1rem', cursor: 'pointer'}}>{item.name}</li>
                    }else{
                        return ""
                    }
                })
            }
        </ul>
    </div>
    </>
  )
}

export default AdminPannel
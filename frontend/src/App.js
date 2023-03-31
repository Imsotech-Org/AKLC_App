import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import News from './pages/News';
import Plans from './pages/Plans';
import AdminPannel from './pages/AdminPannel';
import CreateNewsFeed from './pages/CreateNewsFeed';
import PrivateRoute from './components/PrivateRoute';
import SelectedUser from './pages/SelectedUser';
import CreateNutriotionPlan from './pages/CreateNutriotionPlan';
import CreateWorkoutPlan from './pages/CreateWorkoutPlan';
import CreateGoals from './pages/CreateGoals';
import UserNutrition from './pages/UserNutrition';
import UserWorkouts from './pages/UserWorkouts';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/signIn' element={<SignIn/>}/>      

            <Route path='/' element={<PrivateRoute/>}>
              <Route path='/' element={<Profile/>}/>
            </Route>
            <Route path='/admin-pannel' element={<PrivateRoute/>}>
              <Route path='/admin-pannel' element={<AdminPannel/>}/>
            </Route>
            <Route path='/news' element={<PrivateRoute/>}>
              <Route path='/news' element={<News/>}/>
            </Route>
            <Route path='/plans' element={<PrivateRoute/>}>
              <Route path='/plans' element={<Plans/>}/>
            </Route>
            <Route path='/chat' element={<PrivateRoute/>}>
              <Route path='/chat' element={<Chat/>}/>
            </Route>

            <Route path='/create-news' element={<PrivateRoute/>}>
              <Route path='/create-news' element={<CreateNewsFeed/>}/>
            </Route>
            <Route path='/selected-user/:id' element={<PrivateRoute/>}>
              <Route path='/selected-user/:id' element={<SelectedUser/>}/>
            </Route>
            <Route path='/create-nutrition/:id' element={<PrivateRoute/>}>
              <Route path='/create-nutrition/:id' element={<CreateNutriotionPlan/>}/>
            </Route>
            <Route path='/create-wourkout/:id' element={<PrivateRoute/>}>
              <Route path='/create-wourkout/:id' element={<CreateWorkoutPlan/>}/>
            </Route>
            <Route path='/create-goals/:id' element={<PrivateRoute/>}>
              <Route path='/create-goals/:id' element={<CreateGoals/>}/>
            </Route>

            <Route path='/user-nutrition/' element={<PrivateRoute/>}>
              <Route path='/user-nutrition/' element={<UserNutrition/>}/>
            </Route>
            <Route path='/user-workouts/' element={<PrivateRoute/>}>
              <Route path='/user-workouts/' element={<UserWorkouts/>}/>
            </Route>

          </Routes>
          <Navbar/>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

import { Navigate, Outlet } from "react-router-dom";
import {useAuthStatus} from '../hooks/useAuthStatus';

const PrivateRoute = () => {
 const {loggedIn, loading} = useAuthStatus();

 if(loading) {
  return <h1>Loading...</h1>
 }

  return loggedIn ? <Outlet /> : <Navigate to='/signIn' />
}

export default PrivateRoute
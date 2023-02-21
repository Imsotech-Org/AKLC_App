import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signIn, signOff, reset } from '../features/auth/authSlice';

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, users, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError){
      toast.error(message);
      dispatch(reset());
    }

    // Redirect when logged in
    if(isSuccess || user){
      navigate('/');
    }
  }, [isError, isSuccess, dispatch, user, message, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(email !== "" && password !== ""){
      const userData = {
        email,
        password
      }
      dispatch(signIn(userData));
    }
  }

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(signOff());
    navigate('/signIn');
  }

  return (
    <div>
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
            <label htmlFor="email">
                Email:<br />
                <input type="email" name="email" id="email" value={email} onChange={onChange}/>
            </label><br />
            <label htmlFor="password">
                Password:<br />
                <input type="password" name="password" id="password" value={password} onChange={onChange} />
            </label><br />
            <button>Sign In</button>
        </form>
    </div>
  )
}

export default SignIn
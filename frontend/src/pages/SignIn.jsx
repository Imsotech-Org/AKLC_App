import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signIn, signOff, reset } from '../features/auth/authSlice';
import logo from '../assets/icons-logos/logo-big-first.png';

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
    <div className="containerBasic">
        <div style={{marginTop: '6rem', marginBottom: '6rem'}}>
          <img src={logo} alt='Andrew Kolasko Life Center'  style={{width: '55%', color: 'purple'}} />
        </div>
        
        <h1>Sign In</h1><br />
        <form style={{textAlign: 'left'}} onSubmit={onSubmit}>
            <label htmlFor="email">
                Email:<br /><br />
                <input type="email" name="email" id="email" className="inputLogin" value={email} onChange={onChange}/>
            </label><br /><br />
            <label htmlFor="password">
                Password:<br /><br />
                <input type="password" name="password" id="password" className="inputLogin" value={password} onChange={onChange} />
            </label><br /><br /><br />
            <button className="signInButton">Sign In</button>
        </form>
    </div>
  )
}

export default SignIn
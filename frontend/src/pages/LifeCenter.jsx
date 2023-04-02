import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TopbarMain from '../components/TopbarMain';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useLocation } from 'react-router-dom';

import Product from '../components/Product';
import {getPrograms} from '../features/programs/programsSlice';

const LifeCenter = () => {

    const {programs, isError, isSuccess, message} = useSelector((state) => state.programs);
    const [programId, setProgramId] = useState('');
  
    const dispatch = useDispatch();
    const location = useLocation();
  
    useEffect(() => {
        if(isError){
          toast.error(message);
        }
    
        dispatch(getPrograms());
  
        const element = document.getElementById(window.location.search.split('=')[1]) ? document.getElementById(window.location.search.split('=')[1]) : document.getElementById('containerInitial');
        console.log(window.location.search.split('=')[1]);
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth' });
        }
  
        console.log('Location changed');
    }, [dispatch, isError, isSuccess, message, location]);

  return (
    <>
    <TopbarMain text="Life Center"/>
    <h2 style={{textAlign: 'center', fontSize: '49px', paddingTop: '2.5rem', color: '#363D10'}}>Products and Programs</h2>
      {
        programs.map((item, index) => <Product item={item} index={index} key={index}/>)
      }
    </>
  )
}

export default LifeCenter
import React, {useState, useEffect} from 'react'
import Topbar from '../components/Topbar';
import { getNews } from '../features/news/newsSlice';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';


//opçao deletar aqui

const News = () => {

  const [calledOnce, setCalledOnce] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {news} = useSelector((state) => state.news);

    useEffect(() => {
      if(!calledOnce){
        dispatch(getNews(news));
      }
      setCalledOnce(true);
    }, [dispatch, news, calledOnce]);

  return (
    <>
    <Topbar text="My Resources"/>
    <div className="containerBasic">
    {
      news.map((item) => {return (<div className='card'>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>);})
    }
    </div>
    </>
  )
}

export default News
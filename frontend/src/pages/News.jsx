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
    {
      news.map((item) => {return (<div>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
      </div>);})
    }
    </>
  )
}

export default News
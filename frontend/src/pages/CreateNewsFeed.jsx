import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';
import {BsImageFill} from 'react-icons/bs';
import Topbar from '../components/Topbar';
import {createNews} from '../features/news/newsSlice';
import {useDispatch} from 'react-redux';

const CreateNewsFeed = () => {

  const navigate = useNavigate();

  const [newsData, setNewsData] = useState({
    newsImage: 'teste',
    title: '',
    description: ''
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setNewsData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createNews(newsData));
    //toast.success('News Feed Created!');
  }

  return (
    <>
    <Topbar text="Create Post" backpage="/admin-pannel"/>
    <div className="containerBasic">
      <button onClick={() => navigate('/admin-pannel')}><SlArrowLeft/></button>
      <p>Create News Feed</p>


      <BsImageFill/>
      <form onSubmit={onSubmit}>

      <label htmlFor="title"><br />
        Title:<br />
        <input type="text" name="title" id="title" onChange={onChange}/>
      </label>
      <label htmlFor="description"><br />
        Description:<br />
        <textarea name="description" id="description" cols="30" rows="10" onChange={onChange}></textarea>
      </label><br />

      <input type="datetime" name="datePlan" id="datePlan" hidden />
      
      <button>Post</button>

      </form>

      <p>Previous Posts</p>
    </div>
    </>
  )
}

export default CreateNewsFeed
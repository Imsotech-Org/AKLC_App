import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';
import {BsImageFill} from 'react-icons/bs';
import Topbar from '../components/Topbar';
import {createNews} from '../features/news/newsSlice';
import {useDispatch} from 'react-redux';
import {MdPhotoSizeSelectActual} from 'react-icons/md';
import axios from 'axios';
//import { toast } from 'react-toastify';

const CreateNewsFeed = () => {

  const navigate = useNavigate();

  const [postImage, setPostImage] = useState({newsImage: ""})

  const [newsData, setNewsData] = useState({
    newsImage: '',
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
    console.log(newsData)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, newsImage: base64})
    onChange(e);
    setNewsData((prevState) => ({
      ...prevState,
      newsImage: base64
    }));
    
  }

  return (
    <>
    <Topbar text="Create Post" backpage="/admin-pannel"/>
    <div className="containerBasic">
    <br/>
      <p>Create News Feed</p><br />

      <form onSubmit={onSubmit}>
      Select Image:<br />
      <label htmlFor="newsImage" className='custom-file-upload'><MdPhotoSizeSelectActual style={{cursor: 'pointer',padding: '0', height: '5rem', width: '5rem', color: '#363D10'}}/></label><br />
      <input
        type="file"
        lable="Image"
        name="newsImage"
        id="newsImage"
        accept='.jpeg,.png,.jpg'
        onChange={(e) => handleFileUpload(e)}
        />

      <label htmlFor="title"><br />
        Title:<br />
        <input type="text" name="title" id="title" onChange={onChange} className="inputLogin"/>
      </label>
      <label htmlFor="description"><br />
        Description:<br />
        <textarea name="description" id="description" cols="30" rows="10" onChange={onChange} className='inputGeneral'></textarea>
      </label><br />

      <input type="datetime" name="datePlan" id="datePlan" hidden />
      
      <button className="purpleButton">Post</button>

      </form>

      <br/>
      <p>//Previous Posts:</p>
    </div>
    </>
  )
}

export default CreateNewsFeed

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  })
}
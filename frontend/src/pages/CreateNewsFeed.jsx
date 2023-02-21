import React from 'react';
import { useNavigate } from 'react-router-dom';
import {SlArrowLeft} from 'react-icons/sl';
import {BsImageFill} from 'react-icons/bs';

const CreateNewsFeed = () => {

  const navigate = useNavigate();

  return (
    <div className="containerBasic">
      <button onClick={() => navigate('/admin-pannel')}><SlArrowLeft/></button>
      <p>Create News Feed</p>


      <BsImageFill/>
      <label htmlFor="title"><br />
        Title:<br />
        <input type="text" name="title" id="title" />
      </label>
      <label htmlFor="description"><br />
        Description:<br />
        <textarea name="description" id="description" cols="30" rows="10"></textarea>
      </label><br />
      <input type="datetime" name="datePlan" id="datePlan" hidden />
      <button>Post</button>


      <p>Previous Posts</p>
    </div>
  )
}

export default CreateNewsFeed
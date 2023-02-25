import axios from 'axios';

const API_URL = '/api/app/news';

// Get all news
const getNews = async () => {

    const response = await axios.get(API_URL);

    return response.data;
}

// Get single news
const getSingleNews = async (newsId) => {

    const response = await axios.get(API_URL + '/' + newsId);

    return response.data;
}

const newsService = {
    getNews,
    getSingleNews,
  }
  
  export default newsService;
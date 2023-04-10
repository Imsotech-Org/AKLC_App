import axios from 'axios';

const API_URL = '/api/app/news';

//create news
const createNews = async (newsData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log("SERVICE IMAGE:", newsData);
    const response = await axios.post(API_URL, newsData, config);

    return response.data;
}

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
    createNews,
    //delete news
    getNews,
    getSingleNews,
  }
  
  export default newsService;
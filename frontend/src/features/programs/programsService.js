import axios from 'axios';

const API_URL = '/api/app/programs';

// Get all programs
const getPrograms = async () => {

    const response = await axios.get(API_URL);

    return response.data;
}

// Get prgram
const getProgram = async (programId) => {

    const response = await axios.get(API_URL + '/' + programId);

    return response.data;
}

const programsService = {
    getPrograms,
    getProgram
  }
  
  export default programsService;
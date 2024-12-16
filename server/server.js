//=====================
// Import
//=====================
import axios from 'axios';


//=====================
// Consts
//=====================
const API_URL = 'https://api.osv.dev/v1/query';

//=====================
// Export 
//=====================
export const req = async (body) => {
  try {
    const response = await axios.post(API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log( body )
    console.error(`Error ${error.message}`);
  }
};

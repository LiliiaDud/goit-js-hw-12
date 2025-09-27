import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "52351583-282e675a2a1d7a615546b9ab7";

const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });
    return data;
  } catch (error) {
    console.error('Request to API failed', error)
    
    throw error;
  }
}

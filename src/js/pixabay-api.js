import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "52351583-282e675a2a1d7a615546b9ab7";

 export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
 }


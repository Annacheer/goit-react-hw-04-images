import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '38764161-33ef2e0b129eb594e9cec79f2';

const fetchImages = (query, page, perPage = 12) => {
  return axios.get(
    `?key=${apiKey}&q=${query}&page=${page}&per_page=${perPage}`
  );
};

export { fetchImages };

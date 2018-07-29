import axios from 'axios';

export const searchBook = async function (params) {
  const response = await axios.get('/api/book/fuzzy-search?query=%E6%96%97%E7%A0%B4%E8%8B%8D%E7%A9%B9&start=0');
  console.log(response);
  return response.data
};

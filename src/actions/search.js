import axios from 'axios';

export const SEARCH = 'SEARCH';

const search = async (params) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': token,
    }
  };

  const chunks = await axios.get(`http://localhost:3000/tables/${params}`, config);
  const data = chunks.data;

  return {
    type: SEARCH,
    payload: data,
  };
};

export default search;

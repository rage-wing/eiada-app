import {api} from './api';

const article = (() => {
  const getAll = async () => {
    const res = await api.get('article');
    return res.data;
  };

  return {
    getAll,
  };
})();

export default article;

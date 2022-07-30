import {api} from './api';

const image = (() => {
  const getAll = async () => {
    const res = await api.get('image');
    return res.data;
  };

  return {
    getAll,
  };
})();

export default image;

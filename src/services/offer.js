import {api} from './api';

const offer = (() => {
  const getAll = async () => {
    const res = await api.get('offer');
    return res.data;
  };

  return {
    getAll,
  };
})();

export default offer;

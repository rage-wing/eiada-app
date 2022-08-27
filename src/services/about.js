import {api} from './api';

const about = (() => {
  const get = async () => {
    const res = await api.get('about');
    return res.data;
  };

  return {
    get,
  };
})();

export default about;

import {api} from './api';

const user = (() => {
  const login = async payload => {
    console.log(api.defaults.baseURL);

    const res = await api.post('user/login', payload);
    return res.data;
  };

  return {
    login,
  };
})();

export default user;

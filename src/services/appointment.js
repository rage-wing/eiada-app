import {api} from './api';

const appointment = (() => {
  const getAll = async userId => {
    const res = await api.get(`patient/appointment/${userId}`);
    return res.data;
  };

  return {
    getAll,
  };
})();

export default appointment;

import {api} from './api';

const appointment = (() => {
  const getAll = async userId => {
    const res = await api.get(`patient/appointment/${userId}`);
    return res.data;
  };

  const reserve = async data => {
    const res = await api.post('patient/appointment/reserve', {
      doctor: '62cc29ffeb2fe06ff7211bb0',
      ...data,
    });
    return res.data;
  };

  return {
    getAll,
    reserve,
  };
})();

export default appointment;

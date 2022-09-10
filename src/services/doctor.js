import {api} from './api';

const doctor = (() => {
  const getUpcomingAppointments = async () => {
    const res = await api.get('/doctor/appointment/upcoming');
    return res.data;
  };
  const getPendingAppointments = async () => {
    const res = await api.get('/doctor/appointment/pending');
    return res.data;
  };

  return {
    getUpcomingAppointments,
    getPendingAppointments,
  };
})();

export default doctor;

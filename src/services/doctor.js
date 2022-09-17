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

  const accept = async id => {
    const res = await api.post(`/doctor/appointment/accept/${id}`);
    return res.data;
  };

  const reject = async id => {
    const res = await api.post(`/doctor/appointment/reject/${id}`);
    return res.data;
  };

  return {
    getUpcomingAppointments,
    getPendingAppointments,
    accept,
    reject,
  };
})();

export default doctor;

import {api} from './api';

const article = (() => {
  const getAll = async () => {
    const res = await api.get('article');
    return res.data;
  };

  const create = async payload => {
    const res = await api.post('article', payload);
    return res.data;
  };

  const edit = async (id, payload) => {
    const res = await api.put(`article/${id}`, payload);
    return res.data;
  };

  const remove = async id => {
    const res = await api.delete(`article/${id}`);
    return res.data;
  };

  return {
    getAll,
    create,
    edit,
    remove,
  };
})();

export default article;

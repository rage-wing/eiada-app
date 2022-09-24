import {api} from './api';

const image = (() => {
  const getAll = async () => {
    const res = await api.get('image');
    return res.data;
  };

  const upload = async file => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await api.post('image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  };

  const remove = async id => {
    const res = await api.delete(`image/${id}`);
    return res.data;
  };

  return {
    getAll,
    upload,
    remove,
  };
})();

export default image;

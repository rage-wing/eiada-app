import axios from 'axios';
import keys from '../config/keys.json';

const youtube = (() => {
  const getVideos = async () => {
    const res =
      await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${keys.YT_API_KEY}
      &channelId=${keys.YT_Channel_ID}
      &part=snippet,id&order=date&maxResults=20`);

    return res.data.items;
  };

  return {
    getVideos,
  };
})();

export default youtube;

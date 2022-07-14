const strMax = (str, max) => {
  if (str.length > max) {
    return str.substring(0, max) + '...';
  }
  return str;
};

export default strMax;

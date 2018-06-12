export const getSinger = singerData => {
  if (singerData.length) {
    return singerData.map(i => i.name).join('&');
  } else {
    return '暂无';
  }
};

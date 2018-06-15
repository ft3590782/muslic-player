export const play = song => ({
  type: 'PLAY_SONG',
  song: song
});
export const changePlayIndex = index => ({
  type: 'CHANGE_PLAY_INDEX',
  index: index
});

export const addToList = song => ({
  type: 'ADD_TO_LIST',
  id: song.id,
  songName: song.songName,
  albumName: song.albumName,
  singerName: song.singerName,
  playtime: song.playtime,
  url: song.url
});

export const addSearchToList = song => ({
  type: 'ADD_SEARCH_TO_LIST',
  song: song
});

export const addToListBatch = list => ({
  type: 'ADD_TO_LIST_BATCH',
  songList: list
});

export const getPlayList = () => ({
  type: 'GET_PLAY_LIST'
});

export const updatePlayList = (item, index) => ({
  type: 'UPDATE_PLAY_LIST',
  item: item,
  index: index
});

export const updateSearchList = list => ({
  type: 'UPDATE_SEARCH_LIST',
  list: list
});

export const updateSearchText = text => ({
  type: 'UPDATE_SEARCH_TEXT',
  text: text
});

export const toggleSearchModal = isShow => ({
  type: 'TOGGLE_SEARCH_MODAL',
  isShow: isShow
});

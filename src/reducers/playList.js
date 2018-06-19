import storeHelper from '../util/storeHelper';
const playList = (
  state = storeHelper.getLocalStore('playlist') || {
    currtIndex: 0,
    currtList: []
  },
  action
) => {
  switch (action.type) {
    case 'REMOVE_SONG':
      state.currtList.splice(action.index, 1);
      return storeHelper.setLocalStore('playlist', {
        currtIndex: state.currtIndex,
        currtList: [...state.currtList]
      });
    case 'ADD_SONG':
      return storeHelper.setLocalStore('playlist', {
        currtIndex: state.currtIndex,
        currtList: [
          ...state.currtList,
          {
            id: action.id,
            songName: action.songName,
            albumName: action.albumName,
            singerName: action.singerName,
            playtime: action.playtime,
            url: action.url
          }
        ]
      });
    case 'ADD_SEARCH_TO_LIST':
      let i = Object.assign({}, action.song);
      i.id = i.songid;
      i.songName = i.songname;
      i.albumName = i.albumname;
      i.singerName = i.singer
        .map(s => {
          return s.name;
        })
        .join(',');
      i.playtime = 'i.playtime,';
      i.url = '';

      let idList = state.currtList
        .map(i => {
          return i.id;
        })
        .join(',');

      if (idList.indexOf(i.id) > -1) {
        return storeHelper.setLocalStore('playlist', {
          currtIndex: state.currtIndex,
          currtList: [...state.currtList]
        });
      } else {
        return storeHelper.setLocalStore('playlist', {
          currtIndex: state.currtIndex,
          currtList: [...state.currtList, i]
        });
      }

    case 'ADD_SONG_BATCH':
      return storeHelper.setLocalStore('playlist', {
        currtIndex: state.currtIndex,
        currtList: [...state.currtList, ...action.songList]
      });
    case 'CHANGE_PLAY_INDEX':
      return storeHelper.setLocalStore('playlist', {
        currtIndex: action.index,
        currtList: [...state.currtList]
      });
    case 'GET_PLAY_LIST':
    default: {
      return state;
    }
  }
};

export default playList;

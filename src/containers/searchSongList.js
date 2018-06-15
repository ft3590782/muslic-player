import { connect } from 'react-redux';
import { addSearchToList, play } from '../actions';

import searchSongList from '../components/searchSongList';
import playHelper from '../util/playHelper';

const mapStateToProps = state => ({
  list: state.searchList
});
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToPlayList: async songItem => {
      // console.log('addToPlayList');
      let file = await playHelper.getFile(songItem);
      songItem.playfile = file;
      dispatch(addSearchToList(songItem));
      dispatch(play(file));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(searchSongList);

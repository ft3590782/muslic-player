import { connect } from 'react-redux';

import PlayList from '../components/playList';
import { changePlayIndex, updatePlayList, play } from '../actions';
import playHelper from '../util/playHelper';
const mapStateToProps = state => ({
  playlist: state.playList
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: async (song, index) => {
      let file = await playHelper.getFile(song);
      song.playfile = file;
      dispatch(updatePlayList(song, index));
      dispatch(changePlayIndex(index));
      dispatch(play(file));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);

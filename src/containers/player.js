import { connect } from 'react-redux';
import { play, changePlayIndex } from '../actions';
import Player from '../components/player';
import playHelper from '../util/playHelper';
const mapStateToProps = state => ({
  playing: state.playing,
  playlist: state.playList
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePlayIndex: index => {
      dispatch(changePlayIndex(index));
    },
    play: async songfile => {
      let file = await playHelper.getFile(songfile);
      dispatch(play(file));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);

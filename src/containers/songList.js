import { connect } from 'react-redux';
import { addSong } from '../actions';

import songList from '../components/songList';
const mapStateToProps = state => ({
  playlist: state.playList
});

const mapDispatchToProps = dispatch => {
  return {
    onAddToPlayClick: item => {
      // console.log(item);
      dispatch(addSong(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(songList);

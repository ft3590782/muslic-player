import { connect } from 'react-redux';
import { addSearchToList, play } from '../actions';

import searchSongList from '../components/searchSongList';
import playHelper from '../util/playHelper';

const mapStateToProps = state => ({
  list: state.searchList
});
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToPlayList: async ownProps => {
      // console.log('addToPlayList');
      let file = await playHelper.getFile(ownProps);
      dispatch(addSearchToList(ownProps));
      dispatch(play(file));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(searchSongList);

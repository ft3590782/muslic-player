import { connect } from 'react-redux';

import { updateSearchText, updateSearchList } from '../actions';

import searchSong from '../components/searchSong';

const mapStateToProps = state => {
  return {
    searchInfo: state.searchInfo === '' ? '' : state.searchInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateSearchText: text => {
      dispatch(updateSearchText(text));
    },
    updateSearchList: list => {
      dispatch(updateSearchList(list));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(searchSong);

// export default connect(mapStateToProps)(searchSong);

import { combineReducers } from 'redux';
import playing from './playing';
import playList from './playList';
import searchInfo from './searchInfo';
import searchList from './searchList';

export default combineReducers({
  playing,
  playList,
  searchInfo,
  searchList
});

import { combineReducers } from 'redux';
import playing from './playing';
import playList from './playList';

export default combineReducers({
	playing,
	playList
});

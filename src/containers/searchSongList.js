import { connect } from 'react-redux';
import { addSearchToList, play } from '../actions';

import searchSongList from '../components/searchSongList';
import ajax from '../util/ajax';

const getFile = async (playing) => {
	let song = {};
	console.log('getFile');
	if (playing) {
		Object.assign(song, playing);
		let vkey = await ajax.getVkey(playing.songmid);
		// const filename = getFile(vkey);
		// console.log('vkey');
		// console.log(vkey);
		if (vkey.code === 0) {
			let item = vkey.data.items[0];
			let file = await ajax.getFile(item.filename, item.vkey);

			song.playfile = file;
		}
	}
	return song;
};

const mapStateToProps = (state) => ({
	// playlist: state.playList
});
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addToPlayList: async (ownProps) => {
			console.log('addToPlayList');

			let file = await getFile(ownProps);
			console.log(file);
			dispatch(addSearchToList(ownProps));
			dispatch(play(file));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(searchSongList);

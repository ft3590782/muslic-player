const playing = (state = {}, action) => {
	switch (action.type) {
		case 'PLAY_SONG':
			return action.song;
		default:
			return state;
	}
};
export default playing;

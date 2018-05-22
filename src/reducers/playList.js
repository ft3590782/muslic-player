const playList = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TO_LIST':
			return [
				...state,
				{
					id: action.id,
					songName: action.songName,
					albumName: action.albumName,
					singerName: action.singerName,
					playtime: action.playtime,
					url: action.url
				}
			];
		case 'ADD_SEARCH_TO_LIST':
			let i = Object.assign({}, action.song);
			i.id = i.songid;
			i.songName = i.songname;
			i.albumName = i.albumname;
			i.singerName = i.singer
				.map((s) => {
					return s.name;
				})
				.join(',');
			i.playtime = 'i.playtime,';
			i.url = '';

			return [ ...state, i ];
		case 'ADD_TO_LIST_BATCH':
			return [ ...state, ...action.songList ];
		case 'GET_PLAY_LIST':
		default:
			return state;
	}
};

export default playList;

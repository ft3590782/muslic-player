export const play = (song) => ({
	type: 'PLAY_SONG',
	song: song
});

export const addToList = (song) => ({
	type: 'ADD_TO_LIST',
	id: song.id,
	songName: song.songName,
	albumName: song.albumName,
	singerName: song.singerName,
	playtime: song.playtime,
	url: song.url
});

export const addSearchToList = (song) => ({
	type: 'ADD_SEARCH_TO_LIST',
	song: song
});

export const addToListBatch = (list) => ({
	type: 'ADD_TO_LIST_BATCH',
	songList: list
});

export const getPlayList = () => ({
	type: 'GET_PLAY_LIST'
});

export const setSearchList = () => ({
	type: 'SET_SEARCH_LIST'
});

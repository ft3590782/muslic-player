import React from 'react';

import ajax from '../util/ajax';
import SearchSongList from '../containers/searchSongList';

const SearchList = (searchResult) => {
	console.log(searchResult);
	if (!searchResult) return null;

	return <SearchSongList list={searchResult.song.list} />;
	// return searchResult.song.list.map((i) => {
	// 	return (
	// 		<li key={i.songid}>
	// 			专辑名:{i.albumname}, 歌曲名:{i.songname}, 歌手:{i.singer.map((s) => s.name)}, 歌曲Mid:{i.songmid}
	// 		</li>
	// 	);
	// });
};

class SearchSong extends React.Component {
	constructor() {
		super();
		this.state = { searchList: null };
	}

	async doSearch(searchWord) {
		const res = await ajax.search(searchWord);
		if (res.code === 0) {
			let songList = res.data;
			this.setState({
				searchList: songList
			});
		}
	}

	render() {
		let input;
		return (
			<div className="search">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (!input.value.trim) {
							return;
						}
						this.doSearch(input.value);
					}}
				>
					<input type="text" defaultValue="周杰伦" ref={(node) => (input = node)} />
					<button type="submit">搜索</button>
				</form>
				{SearchList(this.state.searchList)}
			</div>
		);
	}
}

export default SearchSong;

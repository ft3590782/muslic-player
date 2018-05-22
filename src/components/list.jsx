import React from 'react';

import ajax from '../util/ajax';

import SongList from '../containers/songList';

export default class List extends React.Component {
	constructor() {
		super();
		this.getAllSongs = this.getAllSongs.bind(this);
		this.getNewSongs = this.getNewSongs.bind(this);
		this.state = {
			type: 'allSongs',
			allSongs: [],
			newSongs: []
		};
	}

	getAllSongs() {
		ajax.getAllSongs().then((res) => {
			console.log(res);
			if (res.retcode === '1') {
				this.setState({
					allSongs: res.songlist,
					type: 'allSongs'
				});
			}
		});
	}

	getNewSongs() {
		ajax.getNewSongs().then((res) => {
			console.log(res);
			if (res.retcode === '1') {
				this.setState({
					newSongs: res.songlist,
					type: 'newSongs'
				});
			}
		});
	}

	render() {
		const type = this.state.type;
		let list = null;
		if (type === 'allSongs') {
			list = <SongList title="总歌榜" list={this.state.allSongs} />;
		} else {
			list = <SongList title="新歌榜" list={this.state.newSongs} />;
		}

		return (
			<div>
				<div>
					<button onClick={this.getAllSongs}>获取总歌榜</button>
					<button onClick={this.getNewSongs}>获取新歌榜</button>
				</div>
				<hr />
				{list}
			</div>
		);
	}
}

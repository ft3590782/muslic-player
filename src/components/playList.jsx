import React from 'react';

function convertMinsAndSeconds(seconds) {
	let time = (seconds / 60).toFixed(2);
	let min = time.split('.')[0];
	let sec = time.split('.')[1] / 100 * 60;
	return `${min}分${sec}秒`;
}

class PlayList extends React.Component {
	render() {
		const playList = this.props.playlist;
		return (
			<ul className="player">
				{playList.map((item) => {
					return (
						<li key={item.id}>
							id:{item.id}
							<br />
							歌曲名:{item.songName}
							<br />
							专辑名:{item.albumName}
							<br />
							播放时间:{convertMinsAndSeconds(item.playtime)}
							<br />
							歌手:{item.singerName}
							<br />
							url:{item.url}
							<br />
							{
								//JSON.stringify(item)
							}
						</li>
					);
				})}
			</ul>
		);
	}
}

export default PlayList;

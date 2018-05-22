import React from 'react';

class SongList extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<ul>
					{this.props.list.map((item) => (
						<li key={item.id}>
							{item.songName} <span onClick={() => this.props.onAddToPlayClick(item)}>播放</span>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default SongList;

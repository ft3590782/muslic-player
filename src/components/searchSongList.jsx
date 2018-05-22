import React from 'react';

class SearchSongList extends React.Component {
	render() {
		const { list, addToPlayList } = this.props;
		// const addPlayList = (item) => {
		// 	addToPlayList(item);
		// };
		return (
			<ul>
				{list.map((item) => (
					<li
						key={item.songid}
						onClick={() => {
							addToPlayList(item);
						}}
					>
						{item.songname}
						<span>播放</span>
					</li>
				))}
			</ul>
		);
	}
}

export default SearchSongList;

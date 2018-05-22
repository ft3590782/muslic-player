import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import List from './list';
import Player from '../containers/player';
import PlayList from '../containers/playList';
import SearchSong from '../components/searchSong';

class App extends React.Component {
	render() {
		return (
			<div>
				<Player />
				<PlayList />
				<Router>
					<div>
						<Route exact path={`/MusicList`} component={List} />
						<Route path="/search" component={SearchSong} />
						<hr />
						<ul>
							<li>
								<Link to="/MusicList">歌曲列表</Link>
							</li>
							<li>
								<Link to="/search">搜索</Link>
							</li>
						</ul>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;

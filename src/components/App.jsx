import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import List from './list';
import Player from '../containers/player';
import PlayList from '../containers/playList';
import SearchSong from '../containers/searchSong';
import SearchSongList from '../containers/searchSongList';

import Test from '../components/test';

class App extends React.Component {
  render() {
    return (
      <div id="appWrap" className="app-wrap">
        <div id="appHead" className="app-head">
          <SearchSong />
        </div>
        <div id="appBody" className="app-body">
          <SearchSongList />
          <Player />
          <Router>
            <div className="router-wrap">
              <Route exact path={`/`} component={PlayList} />

              <Route path="/test" component={Test} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;

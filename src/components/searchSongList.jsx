import React from 'react';

import Modal from './Modal';
import { getSinger } from '../util/qqSongHelper';

class SearchSongList extends React.Component {
  render() {
    const { list, addToPlayList } = this.props;
    // const addPlayList = (item) => {
    // 	addToPlayList(item);
    // };
    return (
      <Modal portalId="#appBody" isShow={list.length > 0}>
        <div className="search-list-wrap">
          <ul className="search-list">
            {//  JSON.stringify(list)
            list.map(item => (
              <li
                className="item flex-parent start"
                key={item.songid}
                onClick={() => {
                  addToPlayList(item);
                }}
              >
                <div className="song-info">
                  <div className="song-name">{item.songname}</div>
                  <div className="album-name">{item.albumname}</div>
                  <div className="singer">{getSinger(item.singer)}</div>
                </div>
                <div className="song-option">
                  <i className="iconfont icon-bofang" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    );
  }
}

export default SearchSongList;

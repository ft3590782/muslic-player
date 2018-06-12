import React from 'react';

class PlayList extends React.Component {
  render() {
    const playList = this.props.playlist;
    return (
      <div className="play-list-wrap">
        <ul className="play-list">
          {playList.currtList.map(item => {
            return (
              <li key={item.id} className="item flex-parent start">
                <div className="song-info">
                  <p className="song-name">{item.songName}</p>
                  <p className="sub">
                    {item.singerName}-{item.albumName}
                  </p>
                </div>
                <div className="song-option">
                  <i className="iconfont icon-bofang-bai" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PlayList;

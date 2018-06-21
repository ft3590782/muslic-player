import React from 'react';

class PlayList extends React.Component {
  render() {
    const { playlist, play, removeSong } = this.props;

    return (
      <div className="play-list-wrap">
        <ul className="play-list">
          {playlist.currtList.map((item, index) => {
            return (
              <li
                key={item.id}
                className={`item flex-parent start ${
                  index === playlist.currtIndex ? 'active' : ''
                }`}
              >
                <div className="song-info">
                  <p className="song-name">
                    {item.songName}
                    {index === playlist.currtIndex ? '-当前歌曲' : ''}
                  </p>
                  <p className="sub">
                    {item.singerName}-{item.albumName}
                  </p>
                </div>
                <div className="song-option flex-parent end">
                  <i
                    className="iconfont icon-bofang-bai"
                    onClick={() => play(item, index)}
                  />
                  <i
                    className="iconfont icon-close"
                    onClick={() => removeSong(index)}
                  />
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

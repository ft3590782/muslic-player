import React from 'react';
import timeHelper from '../util/timeHelper';
let playTimer;
let isMouseDown = false;
let tempCurrentTime = 0;
let audio, progreesBar;

function once(dom, event, callback) {
  var handle = function() {
    callback();
    dom.removeEventListener(event, handle);
  };
  dom.addEventListener(event, handle);
}

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      playSong: null,
      currentTime: '00:00', //当前歌曲播放的时间
      tempCurrentTime: '00:00', //临时当前歌曲播放的时间
      currentTotalTime: '00:00', //当前歌曲的总时间
      currentVolume: 0.5, //当前歌音量
      isVolume: true, //是否有声音
      playStatus: false, //true为播放状态，false为暂停状态
      progress: 0, //歌曲进度条
      progressLocked: false, //锁定进度条,操作进度条时需要锁定
      autoPlay: false //是否自动开始播放
    };
  }
  componentDidMount() {
    audio = document.getElementById('myAudio');
    if (/i(Phone|P(o|a)d)/.test(navigator.userAgent)) {
      once(document, 'touchstart', () => {
        audio.touchstart = true;
        audio.play();
        audio.pause();
        return false;
      });
    }
    window.myAudio = audio;
    progreesBar = document.getElementById('progressBar');
    let { currtList, currtIndex } = this.props.playlist;
    if (currtList.length && currtIndex >= 0) {
      this.doPlay(currtIndex);
    }
  }

  componentWillUpdate(props, state) {
    // console.log('componentWillUpdate')
    // console.log(props)
    // console.log(state.playStatus)

    audio.volume = state.currentVolume;
  }

  doPlay(index, isChangeIndex) {
    let { currtList } = this.props.playlist;
    this.props.play(currtList[index]);
    isChangeIndex && this.props.changePlayIndex(index);
  }

  playNext() {
    let { currtList, currtIndex } = this.props.playlist;
    if (currtIndex + 1 < currtList.length) {
      currtIndex += 1;
      this.doPlay(currtIndex, true);
    } else {
      currtIndex = 0;
      this.doPlay(currtIndex, true);
    }
    // props.play(currtList[currtIndex])
  }

  playPrev() {
    let { currtIndex } = this.props.playlist;
    // console.log(currtIndex)
    if (currtIndex > 0) {
      currtIndex -= 1;
      this.doPlay(currtIndex);
    }
    // props.play(currtList[currtIndex])
  }

  play(e) {
    this.setState({ playStatus: true, autoPlay: true });
    audio.play();
  }

  ended() {
    this.playNext();
  }

  pause(e) {
    if (!audio.paused) {
      audio.pause();
      this.setState({ playStatus: false });
    }
  }
  updateVolume(isVolume) {
    if (isVolume) {
      this.setVolumeValue(0.5);
    } else {
      this.setVolumeValue(0);
    }

    this.setState({ isVolume: isVolume });
  }

  setVolumeValue(volume) {
    this.setState({ currentVolume: volume });
  }

  updatePlayStatus() {
    //更新当前歌曲总时间
    const newState = {
      currentTime: timeHelper.formatTime(audio.currentTime),
      currentTotalTime: timeHelper.formatTime(audio.duration)
    };
    const _progress = audio.currentTime / audio.duration * 100;

    if (!this.state.progressLocked) {
      newState.progress = _progress;
    }
    this.setState(newState);
    if (this.state.playStatus) {
      playTimer = setTimeout(() => {
        this.updatePlayStatus();
      }, 500);
    }
  }
  canPlay() {
    this.setState({
      currentTime: timeHelper.formatTime(audio.currentTime),
      currentTotalTime: timeHelper.formatTime(audio.duration)
    });

    if (this.state.autoPlay) {
      this.play();
    }
  }

  touchstart(event) {
    console.log('touchstart');
    if (!this.props.playing.playfile || this.props.playing.playfile === '') {
      return false;
    }
    this.setState({
      tempCurrentTime: timeHelper.formatTime(audio.currentTime),
      progressLocked: true
    });
  }

  touchmove(event) {
    console.log('touchmove');
    if (this.state.progressLocked) {
      if (!this.props.playing.playfile || this.props.playing.playfile === '') {
        return false;
      }

      let fixprogress =
        (event.touches[0].clientX - progreesBar.offsetLeft) /
        progreesBar.offsetWidth;
      if (fixprogress < 0) fixprogress = 0;
      if (fixprogress > 1) fixprogress = 1;
      this.setNewTimeAndProgress(fixprogress);
    }
  }

  touchend(event) {
    console.log('touchend');
    audio.currentTime = tempCurrentTime;
    this.setState({ progressLocked: false });
  }

  mousedown(event) {
    if (!this.props.playing.playfile || this.props.playing.playfile === '') {
      return false;
    }
    this.setState({
      tempCurrentTime: timeHelper.formatTime(audio.currentTime),
      progressLocked: true
    });
    isMouseDown = true;
  }

  mousemove(event) {
    if (isMouseDown) {
      // console.log('x' + event.pageX + ',y' + event.pageY);
      let fixprogress =
        (event.pageX - progreesBar.offsetLeft) / progreesBar.offsetWidth;
      if (fixprogress < 0) fixprogress = 0;
      if (fixprogress > 1) fixprogress = 1;
      this.setNewTimeAndProgress(fixprogress);
    }
  }
  mouseup(event) {
    if (isMouseDown) {
      audio.currentTime = tempCurrentTime;
      this.setState({ progressLocked: false });
      isMouseDown = false;
    }
  }

  setNewTimeAndProgress(tempProgress) {
    tempCurrentTime = audio.duration * tempProgress;
    let _progress = tempCurrentTime / audio.duration * 100;
    this.setState({
      progress: _progress,
      currentTime: timeHelper.formatTime(tempCurrentTime),
      tempCurrentTime: timeHelper.formatTime(tempCurrentTime)
    });
  }

  render() {
    const { playing } = this.props;

    let playButton = null;
    let volumeButton = null;

    if (this.state.playStatus) {
      playButton = (
        <div
          className="stop-btn"
          onClick={e => {
            this.pause(e);
          }}
        >
          <i className="iconfont icon-bofangzanting" />
        </div>
      );
    } else {
      playButton = (
        <div
          className="play-btn"
          onClick={e => {
            this.play(e);
          }}
        >
          <i className="iconfont icon-bofang" />
        </div>
      );
    }

    if (this.state.isVolume) {
      volumeButton = (
        <div
          className="stop-btn"
          onClick={() => {
            this.updateVolume(false);
          }}
        >
          <i className="iconfont icon-shengyin" />
        </div>
      );
    } else {
      volumeButton = (
        <div
          className="stop-btn"
          onClick={() => {
            this.updateVolume(true);
          }}
        >
          <i className="iconfont icon-jingyin" />
        </div>
      );
    }

    return (
      <div
        className="player-wrap"
        onMouseMove={e => {
          this.mousemove(e);
        }}
        onMouseUp={e => {
          this.mouseup(e);
        }}
      >
        <div className="song-info">
          <div className="song-name flex-parent center">{playing.songname}</div>
          <div className="song-songer flex-parent center">
            {playing.singerName}
          </div>
        </div>
        {
          //没找到合适图片,唱片图标先不放
          // 	<div className="play-picture">
          // 		<img src="" alt="" />
          // 	</div>
        }
        {
          //歌词功能,暂没有
          // <div className="song-geci m-t-20">
          // 	<ul>
          // 		<li className="active">aaa</li>
          // 		<li>aaa</li>
          // 		<li>aaa</li>
          // 	</ul>
          // </div>
        }
        <div className="progress-wrap flex-parent center">
          <div className="start-time">
            {this.state.progressLocked
              ? this.state.tempCurrentTime
              : this.state.currentTime}
          </div>
          <div id="progressBar" className="progress-bar-bg">
            <div
              className="progress-bar"
              style={{ width: `${this.state.progress}%` }}
            />
            <div
              className="progress-dot flex-parent center"
              style={{ left: `${this.state.progress}%` }}
              onTouchStart={e => {
                this.touchstart(e);
              }}
              onTouchMove={e => {
                this.touchmove(e);
              }}
              onTouchEnd={e => {
                this.touchend(e);
              }}
              onMouseDown={e => {
                this.mousedown(e);
              }}
            >
              <div className="progress-dot-dot " />
            </div>
          </div>
          <div className="end-time">{this.state.currentTotalTime}</div>
        </div>
        <div className="main-option m-t-10 flex-parent avg">
          <div
            className="prev-btn"
            onClick={() => {
              this.playPrev();
            }}
          >
            <i className="iconfont icon-houtui" />
          </div>
          <div
            className="next-btn"
            onClick={() => {
              this.playNext();
            }}
          >
            <i className="iconfont icon-qianjin" />
          </div>
          {playButton}
          {volumeButton}
          <div className="list-btn">
            <i className="iconfont icon-liebiao" />
          </div>
        </div>
        <audio
          style={{ display: 'none' }}
          id="myAudio"
          src={playing.playfile}
          className="m-t-10"
          controls="controls"
          onLoadedData={() => {
            this.canPlay();
          }}
          onPlay={() => {
            this.updatePlayStatus();
          }}
          onPause={() => {
            playTimer && clearTimeout(playTimer);
          }}
          onEnded={() => {
            this.ended();
          }}
        />
      </div>
    );
  }
}

export default Player;

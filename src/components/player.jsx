import React from 'react';
import ajax from '../util/ajax';
import timeHelper from '../util/timeHelper';

let playTimer;
let tempProgress = 0;

class Player extends React.Component {
	constructor() {
		super();
		this.state = {
			currentSongLength: 0, //歌单歌曲数
			currentSongIndex: 0, //当前播放的歌曲索引，默认加载第一首歌
			currentTime: '00:00', //当前歌曲播放的时间
			currentTotalTime: '00:00', //当前歌曲的总时间
			currentVolume: 0.5, //当前歌音量
			isVolume: true, //是否有声音
			playStatus: false, //true为播放状态，false为暂停状态
			progress: 0, //歌曲进度条
			progressLocked: false //锁定进度条,操作进度条时需要锁定
		};
	}
	componentWillUpdate(props, state) {
		let audio = document.getElementById('myAudio');
		if (state.playStatus) {
			audio.play();
		} else {
			audio.pause();
		}

		audio.volume = state.currentVolume;
	}

	play() {
		this.setState({ playStatus: true });
		this.updatePlayStatus();
	}

	pause() {
		this.setState({ playStatus: false });
		clearTimeout(playTimer);
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

	printLog() {
		console.log(new Date().getTime() + '   ');
	}

	updatePlayStatus() {
		//更新当前歌曲总时间
		let audio = document.getElementById('myAudio');
		this.setState({ currentTime: timeHelper.formatTime(audio.currentTime) });
		this.setState({ currentTotalTime: timeHelper.formatTime(audio.duration) });
		let _progress = audio.currentTime / audio.duration * 100;

		if (!this.state.progressLocked) {
			this.setState({ progress: _progress });
		}

		playTimer = setTimeout(() => {
			this.updatePlayStatus();
		}, 250);
	}
	canPlay() {
		let audio = document.getElementById('myAudio');

		this.setState({ currentTime: timeHelper.formatTime(audio.currentTime) });
		this.setState({ currentTotalTime: timeHelper.formatTime(audio.duration) });
		this.play();
	}

	touchstart(event) {
		if (!this.props.playing.playfile || this.props.playing.playfile == '') {
			return false;
		}
		var event = event || window.event;
		this.setState({ progressLocked: true });
		// console.log('Touch started (' + touchstart.x + ',' + touchstart.y + ')');
	}

	touchmove(event) {
		if (!this.props.playing.playfile || this.props.playing.playfile == '') {
			return false;
		}
		var event = event || window.event;
		let audio = document.getElementById('myAudio');
		let progreesBar = document.getElementById('progressBar');
		let fixprogress = (event.touches[0].clientX - progreesBar.offsetLeft) / progreesBar.offsetWidth;
		console.log(fixprogress);
		if (fixprogress < 0) fixprogress = 0;
		if (fixprogress > 1) fixprogress = 1;
		tempProgress = fixprogress;
		audio.currentTime = audio.duration * tempProgress;
		this.setState({ progressLocked: false });
		this.setState({ currentTime: timeHelper.formatTime(audio.currentTime) });

		// console.log(progreesBar.offsetLeft);
		// console.log((event.touches[0].clientX - progreesBar.offsetLeft * 2) / progreesBar.offsetWidth);
		// console.log('Touch moved (' + event.touches[0].clientX + ',' + event.touches[0].clientY + ')');
	}

	touchend(event) {
		var event = event || window.event;

		// console.log('Touch ended (' + event.changedTouches[0].clientX + ',' + event.changedTouches[0].clientY + ')');
	}

	render() {
		const { playlist, playing } = this.props;
		const state = this.state;

		let playButton = null;
		let volumeButton = null;

		if (this.state.playStatus) {
			playButton = (
				<div
					className="stop-btn"
					onClick={() => {
						this.pause();
					}}
				>
					<i className="iconfont icon-bofangzanting" />
				</div>
			);
		} else {
			playButton = (
				<div
					className="play-btn"
					onClick={() => {
						this.play();
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
			<div className="player-wrap">
				<div className="song-info">
					<div className="song-name flex-parent center">啊啊啊</div>
					<div className="song-songer m-t-10 flex-parent center">啊啊啊</div>
				</div>
				{
					//没找到合适图片,唱片图标先不放
					// 	<div className="play-picture">
					// 		<img src="" alt="" />
					// 	</div>
				}
				<div className="song-geci m-t-20">
					<ul>
						<li className="active">aaa</li>
						<li>aaa</li>
						<li>aaa</li>
					</ul>
				</div>
				<div className="progress-wrap flex-parent center">
					<div className="start-time">{this.state.currentTime}</div>
					<div id="progressBar" className="progress-bar-bg">
						<div className="progress-bar" style={{ width: `${this.state.progress}%` }} />
						<div
							className="progress-dot flex-parent center"
							style={{ left: `${this.state.progress}%` }}
							onTouchStart={(e) => {
								this.touchstart(e);
							}}
							onTouchMove={(e) => {
								this.touchmove(e);
							}}
							onTouchEnd={(e) => {
								this.touchend(e);
							}}
						>
							<div className="progress-dot-dot " />
						</div>
					</div>
					<div className="end-time">{this.state.currentTotalTime}</div>
				</div>
				<div className="main-option m-t-10 flex-parent avg">
					<div className="prev-btn">
						<i className="iconfont icon-shangyishou" />
					</div>
					<div className="next-btn">
						<i className="iconfont icon-kuaijin" />
					</div>
					{playButton}
					{volumeButton}
					<div className="list-btn">
						<i className="iconfont icon-liebiao" />
					</div>
				</div>

				<audio
					id="myAudio"
					src={playing.playfile}
					className="m-t-10"
					controls="controls"
					onLoadedData={() => {
						this.canPlay();
					}}
					onPlay={() => {
						this.play();
					}}
					onPause={() => {
						this.pause();
					}}
					onPlaying={() => {
						this.printLog();
					}}
				/>
			</div>
		);
	}
}

export default Player;

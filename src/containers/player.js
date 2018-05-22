import { connect } from 'react-redux';

import Player from '../components/player';
const mapStateToProps = (state) => ({
	playing: state.playing,
	playlist: state.playList
});

export default connect(mapStateToProps)(Player);

import { connect } from 'react-redux';

import PlayList from '../components/playList';
const mapStateToProps = (state) => ({
	playlist: state.playList
});

export default connect(mapStateToProps)(PlayList);

import React from 'react';

import ajax from '../util/ajax';

class SearchSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  handleChange = event => {
    this.setState({ searchText: event.target.value });
  };

  async doSearch(searchWord) {
    await this.props.updateSearchText(searchWord);
    const res = await ajax.search(searchWord);
    if (res.code === 0) {
      this.props.updateSearchList(res.data.song.list);
    }
  }

  clearSearch() {
    this.setState({ searchText: '' });
    this.props.updateSearchText('');
    this.props.updateSearchList([]);
  }

  render() {
    let input;
    let searchText = this.state.searchText;

    let closeText = (
      <i
        className=" iconfont icon-close"
        onClick={() => {
          this.clearSearch();
        }}
      />
    );

    return (
      <div className="search-wrap flex-parent center">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!searchText.trim) {
              return;
            }
            this.doSearch(searchText);
          }}
        >
          <div className="icon-input">
            <label className="start-icon" htmlFor="searchText">
              <i className="iconfont icon-search" />
            </label>
            <input
              className="input"
              id="searchText"
              type="text"
              placeholder="搜你想听的歌或歌手"
              onChange={this.handleChange}
              value={searchText}
            />
            <span className="end-icon">
              {searchText !== '' ? closeText : null}
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchSong;

const searchInfo = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_TEXT':
      return action.text;
    default:
      return state;
  }
};

export default searchInfo;

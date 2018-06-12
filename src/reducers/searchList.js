const searchList = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_LIST':
      return action.list;
    default:
      return state;
  }
};

export default searchList;

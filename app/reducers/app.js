let initialstate = {
  name: 'joeldemo',
  year: '',
  loading: false,
  showFeedback: false
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case 'APP_SET_NAME':
      state.name = action.name;
      return state;
    case 'APP_SET_YEAR':
      state.year = action.year;
      return state;
    case 'LOADING':
      state.loading = action.loading;
      return state;
    case 'SHOW_FEEDBACK':
      state.showFeedback = action.show;
      return state;
    default:
      return state;
  }
};

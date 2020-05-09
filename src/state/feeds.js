import { getArticles } from '../utilities/feeds'

function setFeedAction(feed) {
  getArticles(feed);
  return {
    type: 'SET_FEED',
    payload: feed,
  };
}

function clearFeedAction() {
  return {
    type: 'CLEAR_FEED',
  };
}

function feedReducer(state = null, action) {
  switch (action.type) {
    case 'SET_FEED':
      return action.payload;
    case 'CLEAR_FEED':
      return null;
    default:
      return state;
  }
}

export {
  setFeedAction,
  clearFeedAction,
  feedReducer,
};

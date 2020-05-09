import { getArticles } from '../utilities/feeds'

function addFeedAction(feed) {
  return {
    type: 'ADD_FEED',
    payload: feed,
  };
}

function removeFeedAction(url) {
  return {
    type: 'REMOVE_FEED',
    payload: url,
  };
}

function clearFeedAction() {
  return {
    type: 'CLEAR_FEED',
  };
}

function feedReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_FEED':
      return [...state, action.payload];
    case 'REMOVE_FEED':
      const index = state.findIndex(feed => feed.url === action.payload);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    case 'CLEAR_FEED':
      return null;
    default:
      return state;
  }
}

export {
  addFeedAction,
  removeFeedAction,
  clearFeedAction,
  feedReducer,
};

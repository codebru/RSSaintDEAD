import { getArticles } from '../utilities/feeds'
import { setObject } from '../utilities/storage';

const FEED_KEY = 'FEED_KEY';

function loadFeedsAction(feeds) {
  return {
    type: 'LOAD_FEEDS',
    payload: feeds,
  };
}

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
    case 'LOAD_FEEDS':
      console.log('Loading feeds');
      console.log(action.payload);
      return action.payload;
    case 'ADD_FEED':
      let newFeedStateAdd = [];
      if(state) newFeedStateAdd = [...state];
      newFeedStateAdd = [...newFeedStateAdd, action.payload];

      setObject(FEED_KEY, newFeedStateAdd);
      return newFeedStateAdd;
    case 'REMOVE_FEED':
      const index = state.findIndex(feed => feed.url === action.payload);
      const newFeedStateDelete = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      setObject(FEED_KEY, newFeedStateDelete);
      return newFeedStateDelete;
    case 'CLEAR_FEED':
      return null;
    default:
      return state;
  }
}

export {
  FEED_KEY,
  loadFeedsAction,
  addFeedAction,
  removeFeedAction,
  clearFeedAction,
  feedReducer,
};

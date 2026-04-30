import type { Reducer } from 'redux';
import { setObject } from '../utilities/storage';

export const FEED_KEY = 'FEED_KEY';

export interface Feed {
  title: string;
  description: string;
  url: string;
}

export type FeedsState = Feed[] | null;

interface LoadFeedsAction { type: 'LOAD_FEEDS'; payload: Feed[] | null }
interface AddFeedAction { type: 'ADD_FEED'; payload: Feed }
interface RemoveFeedAction { type: 'REMOVE_FEED'; payload: string }
interface ClearFeedAction { type: 'CLEAR_FEED' }

export type FeedsAction =
  | LoadFeedsAction
  | AddFeedAction
  | RemoveFeedAction
  | ClearFeedAction;

function loadFeedsAction(feeds: Feed[] | null): LoadFeedsAction {
  return { type: 'LOAD_FEEDS', payload: feeds };
}

function addFeedAction(feed: Feed): AddFeedAction {
  return { type: 'ADD_FEED', payload: feed };
}

function removeFeedAction(url: string): RemoveFeedAction {
  return { type: 'REMOVE_FEED', payload: url };
}

function clearFeedAction(): ClearFeedAction {
  return { type: 'CLEAR_FEED' };
}

const feedReducer: Reducer<FeedsState, FeedsAction> = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_FEEDS':
      console.log('Loading feeds');
      console.log(action.payload);
      return action.payload;
    case 'ADD_FEED': {
      const newFeedStateAdd: Feed[] = [...(state ?? []), action.payload];
      setObject(FEED_KEY, newFeedStateAdd);
      return newFeedStateAdd;
    }
    case 'REMOVE_FEED': {
      const current = state ?? [];
      const index = current.findIndex((feed) => feed.url === action.payload);
      const newFeedStateDelete = [
        ...current.slice(0, index),
        ...current.slice(index + 1),
      ];
      setObject(FEED_KEY, newFeedStateDelete);
      return newFeedStateDelete;
    }
    case 'CLEAR_FEED':
      return null;
    default:
      return state;
  }
};

export {
  loadFeedsAction,
  addFeedAction,
  removeFeedAction,
  clearFeedAction,
  feedReducer,
};

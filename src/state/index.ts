import { combineReducers, createStore } from 'redux';

import { feedReducer, loadFeedsAction, FEED_KEY, type Feed } from './feeds';
import { articlesReducer } from './articles';
import { getObject } from '../utilities/storage';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => never;
  }
}

const allReducers = combineReducers({
  feeds: feedReducer,
  articles: articlesReducer,
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

async function loadStateFromDisk(): Promise<void> {
  const feeds = await getObject<Feed[]>(FEED_KEY);
  store.dispatch(loadFeedsAction(feeds));
}

store.subscribe(() => {
  console.log('_______ STORE UPDATE ________');
  console.log(store.getState());
});

export {
  loadStateFromDisk,
  store,
};

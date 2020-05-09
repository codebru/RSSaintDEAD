import { combineReducers, createStore } from 'redux';

import { feedReducer, loadFeedsAction, FEED_KEY } from './feeds';
import { articlesReducer, setArticlesAction } from './articles';
import { getObject } from '../utilities/storage';

const allReducers = combineReducers({
  feeds: feedReducer,
  articles: articlesReducer,
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

async function loadStateFromDisk() {
  store.dispatch(loadFeedsAction(await getObject(FEED_KEY)));
}

store.subscribe(() => {
  console.log('_______ STORE UPDATE ________');
  console.log(store.getState())
}
  )

export {
  loadStateFromDisk,
  store,
};

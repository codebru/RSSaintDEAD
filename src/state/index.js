import { combineReducers, createStore } from 'redux';

import { feedReducer } from './feeds';
import { articlesReducer } from './articles';

const allReducers = combineReducers({
  feeds: feedReducer,
  articles: articlesReducer,
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
  console.log(store.getState())
})

export default store;

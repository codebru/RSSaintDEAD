import type { Reducer } from 'redux';
import type { FeedItem } from '../utilities/feeds';

export interface Article extends FeedItem {
  feedTitle: string;
  feedURL: string;
}

export type ArticlesState = Article[] | null;

interface SetArticlesAction { type: 'SET_ARTICLES'; payload: Article[] }
interface ClearArticlesAction { type: 'CLEAR_ARTICLES' }

export type ArticlesAction = SetArticlesAction | ClearArticlesAction;

function setArticlesAction(articles: Article[]): SetArticlesAction {
  return { type: 'SET_ARTICLES', payload: articles };
}

function clearArtilesAction(): ClearArticlesAction {
  return { type: 'CLEAR_ARTICLES' };
}

const articlesReducer: Reducer<ArticlesState, ArticlesAction> = (state = null, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return action.payload;
    case 'CLEAR_ARTICLES':
      return null;
    default:
      return state;
  }
};

export {
  setArticlesAction,
  clearArtilesAction,
  articlesReducer,
};

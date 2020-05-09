import Parser from 'rss-parser';
import { setArticlesAction } from '../state/articles';
import store from '../state';

const parser = new Parser();
// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

async function getArticles(feedURL) {
  let feed = await parser.parseURL(`${CORS_PROXY}${feedURL}`);
  console.log(feed.items[0]);
  store.dispatch(setArticlesAction(feed.items));
  return feed;
}

export {
  getArticles,
};

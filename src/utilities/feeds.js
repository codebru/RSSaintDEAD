import Parser from 'rss-parser';
import { setArticlesAction } from '../state/articles';
import store from '../state';

const parser = new Parser();
// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

async function getFeed(feedURL) {
  let feed = await parser.parseURL(`${CORS_PROXY}${feedURL}`);
  console.log(feed.items[0]);
  return feed;
}

async function getAllArticles() {
  const { feeds } = store.getState();
  let allArticles = [];

  for (const feed of feeds) {
    const { items } = await getFeed(feed.url);
    allArticles = [
      ...allArticles,
      ...items,
    ]
  }
  store.dispatch(setArticlesAction(allArticles));
}

export {
  getFeed,
  getAllArticles,
};

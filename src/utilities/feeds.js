import Parser from 'rss-parser';
import { setArticlesAction } from '../state/articles';
import { store } from '../state';
import { message } from 'antd';

const parser = new Parser();
// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

async function getFeed(feedURL) {
  let feed = null;
  try {
  feed = await parser.parseURL(`${CORS_PROXY}${feedURL}`);
  } catch (err) {
    if (`${err}` === 'Error: Status code 404') {
      message.error('Not a valid rss feed!')
    } else {
      message.error(`${err}`);
    }
  }
  return feed;
}

async function getAllArticles() {
  const { feeds } = store.getState();
  let allArticles = [];
  console.log('__feeds__');
  console.log(feeds);

  if (!feeds || !Array.isArray(feeds)) return;

  for (const feed of feeds) {
    let { items } = await getFeed(feed.url);
    items = items.map((item) => {
      const newItem = item;
      newItem.feedTitle = feed.title;
      newItem.feedURL = feed.url;
      return newItem;
    })
    allArticles = [
      ...allArticles,
      ...items,
    ];
  }
  store.dispatch(setArticlesAction(allArticles));
}

export {
  getFeed,
  getAllArticles,
};

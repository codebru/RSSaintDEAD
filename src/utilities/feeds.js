import { setArticlesAction } from '../state/articles';
import { store } from '../state';
import { message } from 'antd';
import { fetchText } from './crossOriginFetch';

// TODO review this as it was generated
const text = (parent, tag) => parent.querySelector(tag)?.textContent ?? '';

function parseFeed(xmlString) {
  const doc = new DOMParser().parseFromString(xmlString, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('Invalid XML');

  const isAtom = !!doc.querySelector('feed > entry');
  const channel = isAtom ? doc.querySelector('feed') : doc.querySelector('channel');
  if (!channel) throw new Error('Not an RSS or Atom feed');

  const entryNodes = channel.querySelectorAll(isAtom ? 'entry' : 'item');
  const items = Array.from(entryNodes).map((node) => ({
    title: text(node, 'title'),
    link: isAtom
      ? node.querySelector('link')?.getAttribute('href') ?? ''
      : text(node, 'link'),
    content:
      text(node, 'content\\:encoded') ||
      text(node, 'content') ||
      text(node, 'description') ||
      text(node, 'summary'),
    isoDate: new Date(
      text(node, 'pubDate') || text(node, 'updated') || text(node, 'published')
    ).toISOString(),
  }));

  return {
    title: text(channel, 'title'),
    description: text(channel, isAtom ? 'subtitle' : 'description'),
    items,
  };
}

async function getFeed(feedURL) {
  try {
    const xml = await fetchText(feedURL);
    return parseFeed(xml);
  } catch (err) {
    if (err.status === 404) message.error('Not a valid rss feed!');
    else message.error(`${err.message ?? err}`);
    return null;
  }
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

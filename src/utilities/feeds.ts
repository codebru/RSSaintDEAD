import { message } from 'antd';
import { setArticlesAction } from '../state/articles';
import { store } from '../state';
import { fetchText, HttpStatusError } from './crossOriginFetch';

export interface FeedItem {
  title: string;
  link: string;
  content: string;
  isoDate: string;
}

export interface ParsedFeed {
  title: string;
  description: string;
  items: FeedItem[];
}

// TODO review this as it was generated
const text = (parent: Element, tag: string): string =>
  parent.querySelector(tag)?.textContent ?? '';

function parseFeed(xmlString: string): ParsedFeed {
  const doc = new DOMParser().parseFromString(xmlString, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('Invalid XML');

  const isAtom = !!doc.querySelector('feed > entry');
  const channel = isAtom ? doc.querySelector('feed') : doc.querySelector('channel');
  if (!channel) throw new Error('Not an RSS or Atom feed');

  const entryNodes = channel.querySelectorAll(isAtom ? 'entry' : 'item');
  const items: FeedItem[] = Array.from(entryNodes).map((node) => ({
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

async function getFeed(feedURL: string): Promise<ParsedFeed | null> {
  try {
    const xml = await fetchText(feedURL);
    return parseFeed(xml);
  } catch (err) {
    if (err instanceof HttpStatusError && err.status === 404) {
      message.error('Not a valid rss feed!');
    } else {
      message.error(err instanceof Error ? err.message : String(err));
    }
    return null;
  }
}

async function getAllArticles(): Promise<void> {
  const { feeds } = store.getState();
  let allArticles: Array<FeedItem & { feedTitle: string; feedURL: string }> = [];
  console.log('__feeds__');
  console.log(feeds);

  if (!feeds || !Array.isArray(feeds)) return;

  for (const feed of feeds) {
    const parsed = await getFeed(feed.url);
    if (!parsed) continue;
    const items = parsed.items.map((item) => ({
      ...item,
      feedTitle: feed.title,
      feedURL: feed.url,
    }));
    allArticles = [...allArticles, ...items];
  }
  store.dispatch(setArticlesAction(allArticles));
}

export { getFeed, getAllArticles };

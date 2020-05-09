import React, { useState } from 'react';
import {
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import { Card, Spin } from 'antd';
import Parser from 'rss-parser';
const parser = new Parser();

// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const FEED = 'http://feeds.bbci.co.uk/news/world/africa/rss.xml';

async function getFeed(feedURL) {
  let feed = await parser.parseURL(`${CORS_PROXY}${feedURL}`);
  console.log(feed.items[0])
  return feed;
}

function Feed() {
  const [feed, setFeed] = useState(null);
  useIonViewWillEnter(() => {
    async function data() {
      setFeed(await getFeed(FEED))
    }
    data();
  })
  return (
    <div>
      {feed 
        ? feed.items.map((item) => {
          return (
            <Card size="small" title={item.title} extra={<a href={item.link}>More</a>} style={{ width: 300 }}>
              <p>{item.content}</p>
            </Card>
          )
      })
      : <Spin />}
    </div>
  );
}

export default Feed;
import React, { useState } from 'react';
import {
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import {
  Card,
  Spin,
  Space,
} from 'antd';
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
    <Space direction="vertical" style={{ width: '100%', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
      {feed
        ? feed.items.map((item) => {
          return (
            <Card size="small" title={item.title} extra={<a href={item.link}>More</a>} style={{ width: '100%' }}>
              <p>{item.content}</p>
            </Card>
          )
        })
        : (
          <Spin tip="Loading...">
            <Card loading={true} />
          </Spin>
        )}
    </Space>
  );
}

export default Feed;
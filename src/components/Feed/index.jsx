import React, { useEffect, useState } from 'react';
import {
  Card,
  Spin,
  Space,
} from 'antd';

function compareTime( a, b ) {
  const dA = new Date(a.isoDate);
  const dB = new Date(b.isoDate);
  const unixA = dA.getTime();
  const unixB = dB.getTime();
  if ( unixA > unixB ){
    return -1;
  }
  if ( unixA < unixB ){
    return 1;
  }
  return 0;
}

function sortArticles(articles){
  const newArticles = articles;
  newArticles.sort(compareTime);
  return newArticles;
}

function Feed(props) {
  const { articles } = props;
  const [sortedArticles, setSortedArticles] = useState(null);

  useEffect(() =>{
    console.log('____ARTICLE_EFFECT_____');
    console.log(articles);
    if(articles) {
      setSortedArticles(sortArticles(articles));
    }
  },[articles])

  return (
    <Space direction="vertical" style={{ width: '100%', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
      {sortedArticles
        ? sortedArticles.map((item) => {
          console.log(item);
          return (
            <Card size="small" title={`${item.feedTitle} | ${item.title}`} extra={<a href={item.link}>More</a>} style={{ width: '100%' }}>
              <p>{item.content}</p>
              <p><strong>{item.isoDate}</strong></p>
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
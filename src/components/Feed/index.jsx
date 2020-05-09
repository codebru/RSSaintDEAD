import React, { useEffect, useState } from 'react';
import {
  Card,
  Spin,
  Space,
  Divider,
} from 'antd';
import SafelySetInnerHTML from 'safely-set-inner-html';

const instance = new SafelySetInnerHTML({
  ALLOWED_TAGS: [
    'div',
    'h1',
    'p',
    'h2',
    'h3',
    'h4',
    'a',
    'table',
    'strong',
    'tr',
    'td',
    'img',
    'br',
    'span',
  ],
  ALLOWED_ATTRIBUTES: [
    'alt',
    'src',
    'href',
    'class'
  ]
});
 

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

function formatDate(isoDate) {
  console.log('______TIME______');
  console.log(isoDate);
  const dt = new Date(isoDate);
  const year = dt.getFullYear();
  const month = dt.getMonth();
  const day = dt.getDate();
  const hour = dt.getHours();
  const min = dt.getMinutes();
  const timeString = `${year}/${month}/${day} - ${hour}:${min}`;
  return (<p>{timeString}</p>)
}

function Feed(props) {
  const { articles } = props;
  const [sortedArticles, setSortedArticles] = useState(null);

  useEffect(() =>{
    console.log('____ARTICLE_EFFECT_____');
    console.log(articles);
    if(articles && articles.length > 0) {
      setSortedArticles(sortArticles(articles));
    }
  },[articles])

  return (
    <Space direction="vertical" style={{ width: '100%', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
      {sortedArticles
        ? sortedArticles.map((item) => {
          console.log(item);
          return (
            <Card
            size="small"
            title={item.feedTitle}
            extra={<a href={item.link}>More</a>} 
            style={{ width: '100%' }}
            headStyle={{backgroundColor: 'rgb(236, 236, 236)'}}
            >
              <h1 style={{fontSize: '1.5rem'}}>{item.title}</h1>
              <Divider style={{margin: '1rem'}} />
              <div>
                {instance.transform(item.content)}
              </div>
              <Divider />
              <p>
                <strong>
                  {formatDate(item.isoDate)}
                </strong>
              </p>
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
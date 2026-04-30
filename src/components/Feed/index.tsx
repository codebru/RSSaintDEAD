import { useEffect, useState } from 'react';
import { Card, Spin, Space, Divider } from 'antd';
import SanitizedHtml from '../../utilities/sanitize';
import type { Article } from '../../state/articles';

function compareTime(a: Article, b: Article): number {
  const unixA = new Date(a.isoDate).getTime();
  const unixB = new Date(b.isoDate).getTime();
  if (unixA > unixB) return -1;
  if (unixA < unixB) return 1;
  return 0;
}

function sortArticles(articles: Article[]): Article[] {
  return [...articles].sort(compareTime);
}

function formatDate(isoDate: string) {
  console.log('______TIME______');
  console.log(isoDate);
  const dt = new Date(isoDate);
  const year = dt.getFullYear();
  const month = dt.getMonth();
  const day = dt.getDate();
  const hour = dt.getHours();
  const min = dt.getMinutes();
  const timeString = `${year}/${month}/${day} - ${hour}:${min}`;
  return <p>{timeString}</p>;
}

interface FeedProps {
  articles: Article[] | null;
}

function Feed({ articles }: FeedProps) {
  const [sortedArticles, setSortedArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    console.log('____ARTICLE_EFFECT_____');
    console.log(articles);
    if (articles && articles.length > 0) {
      setSortedArticles(sortArticles(articles));
    }
  }, [articles]);

  return (
    <Space orientation="vertical" style={{ width: '100%', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
      {sortedArticles
        ? sortedArticles.map((item, idx) => {
          console.log(item);
          return (
            <Card
              key={`${item.feedURL}-${idx}`}
              size="small"
              title={item.feedTitle}
              extra={<a href={item.link}>More</a>}
              style={{ width: '100%' }}
              headStyle={{ backgroundColor: 'rgb(236, 236, 236)' }}
            >
              <h1 style={{ fontSize: '1.5rem' }}>{item.title}</h1>
              <Divider style={{ margin: '1rem' }} />
              <SanitizedHtml html={item.content} />
              <Divider />
              <p>
                <strong>{formatDate(item.isoDate)}</strong>
              </p>
            </Card>
          );
        })
        : (
          <Spin description="Loading...">
            <Card loading={true} />
          </Spin>
        )}
    </Space>
  );
}

export default Feed;

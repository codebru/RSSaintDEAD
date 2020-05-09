import React from 'react';
import {
  Card,
  Spin,
  Space,
} from 'antd';

function Feed(props) {
  const { feed } = props;
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
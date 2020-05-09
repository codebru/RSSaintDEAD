import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
} from 'antd';
import { store } from '../../state'
import { addFeedAction } from '../../state/feeds';
import { getFeed } from '../../utilities/feeds';

const SUGGESTED_FEEDS = [
  {
    title: 'BBC Africa',
    url: 'http://feeds.bbci.co.uk/news/world/africa/rss.xml',
  },
  {
    title: 'Guardian World',
    url: 'https://www.theguardian.com/world/rss',
  },
];

function InputFeed() {
  const [loading, setLoading] = useState(false);

  function onFinish(values) {
    const { feedUrl } = values;
    addFeed(feedUrl);
  }

  async function addFeed(url) {
    let feed = null;
    let title = null;
    let description = null;
    setLoading(true);
    feed = await getFeed(url);
    if (!feed) {
    setLoading(false);
      return;
    }
    title = feed.title;
    description = feed.description;
    store.dispatch(addFeedAction({
      title,
      description,
      url: url,
    }));
    setLoading(false);
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Feed Url"
          name="feedUrl"
          rules={[
            { required: true, message: 'Please input a feed url!' },
            { type: 'url', message: 'Must be valid URL' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Card title="Suggested Feeds">
        {SUGGESTED_FEEDS.map((suggestedFeed) => {
          return (
            <Row style={{ marginBottom: '0.5rem' }}>
              <Col span={20}>{suggestedFeed.title}</Col>
              <Col span={4}>
                <Button type="primary" onClick={() => addFeed(suggestedFeed.url)} loading={loading}>Add</Button>
              </Col>
            </Row>
          )
        })}
      </Card>
    </Card>
  );
}

export default InputFeed;
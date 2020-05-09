import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
} from 'antd';
import { store } from '../../state'
import { addFeedAction } from '../../state/feeds';
import { getFeed } from '../../utilities/feeds';


function InputFeed() {
  const [loading, setLoading] = useState(false);

  async function onFinish(values) {
    const { feedUrl } = values;
    let feed = null;
    let title = null;
    let description = null;
    setLoading(true);
    feed = await getFeed(feedUrl);
    if (!feed) {
    setLoading(false);
      return;
    }
    title = feed.title;
    description = feed.description;
    store.dispatch(addFeedAction({
      title,
      description,
      url: feedUrl,
    }));
    setLoading(false);
  };

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
    </Card>
    );
}

export default InputFeed;
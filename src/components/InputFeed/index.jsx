import React from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
} from 'antd';
import store from '../../state'
import { addFeedAction } from '../../state/feeds';
import { getArticles } from '../../utilities/feeds';

async function onFinish(values) {
  const { feedUrl } = values;
  const feed = await getArticles(feedUrl);
  const { title, description } = feed;
  store.dispatch(addFeedAction({
    title,
    description,
    url: feedUrl,
  }));
  console.log('Success:', values);
};

function onFinishFailed(errorInfo) {
  console.log('Failed:', errorInfo);
};

function InputFeed() {
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
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </Card>
    );
}

export default InputFeed;
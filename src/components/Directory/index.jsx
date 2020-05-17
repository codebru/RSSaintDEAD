import React, { useEffect, useState } from 'react';
import { Collapse, Card, Row, Col, Button, Divider } from 'antd';
import directory from './directory.json';

const { Panel } = Collapse;

function Directory(props) {
  const { addFeed, loading} = props;
  return (
    <Card title="Directory">
      <Collapse accordion>
        {directory.map((house, index) => {
          return (
            <Panel header={house.name} key={index}>
              {house.feeds.map((feed) => {
                return (
                  <Row style={{ marginBottom: '0.5rem' }}>
              <Col span={20}>{feed.name}</Col>
              <Col span={4}>
                <Button type="primary" onClick={() => addFeed(feed.url)} loading={loading}>Add</Button>
              </Col>
            </Row>
                )
              })}
              <Divider />
              <p>{house.notes}</p>
            </Panel>
          )
        })}
      </Collapse>
    </Card>
  );
}

export default Directory;
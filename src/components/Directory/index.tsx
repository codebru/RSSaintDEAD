import { Collapse, Card, Row, Col, Button, Divider } from 'antd';
import directory from './directory.json';

const { Panel } = Collapse;

interface DirectoryFeed {
  name: string;
  url: string;
}

interface DirectoryHouse {
  name: string;
  feeds: DirectoryFeed[];
  notes?: string;
}

interface DirectoryProps {
  addFeed: (url: string) => void;
  loading: boolean;
}

function Directory({ addFeed, loading }: DirectoryProps) {
  const houses = directory as DirectoryHouse[];
  return (
    <Card title="Directory">
      <Collapse accordion>
        {houses.map((house, index) => {
          return (
            <Panel header={house.name} key={index}>
              {house.feeds.map((feed) => {
                return (
                  <Row style={{ marginBottom: '0.5rem' }} key={feed.url}>
                    <Col span={20}>{feed.name}</Col>
                    <Col span={4}>
                      <Button type="primary" onClick={() => addFeed(feed.url)} loading={loading}>Add</Button>
                    </Col>
                  </Row>
                );
              })}
              <Divider />
              <p>{house.notes}</p>
            </Panel>
          );
        })}
      </Collapse>
    </Card>
  );
}

export default Directory;

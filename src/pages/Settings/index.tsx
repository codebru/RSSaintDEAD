import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import InputFeed from '../../components/InputFeed';
import { DeleteOutlined } from '@ant-design/icons';
import { removeFeedAction, type Feed } from '../../state/feeds';
import { store } from '../../state';
import type { RootState } from '../../state';

const Settings = () => {
  const feeds = useSelector((state: RootState) => state.feeds);

  const columns: ColumnsType<Feed> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Delete',
      key: 'action',
      render: (_text, record) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => store.dispatch(removeFeedAction(record.url))} />
        </Space>
      ),
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Table
          pagination={false}
          columns={columns}
          dataSource={feeds ?? []}
          rowKey="url"
          style={{ width: '100%' }}
        />
        <InputFeed />
      </IonContent>
    </IonPage>
  );
};

export default Settings;

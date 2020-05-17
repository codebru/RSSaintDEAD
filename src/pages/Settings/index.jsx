import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Tag, Space } from 'antd';
import InputFeed from '../../components/InputFeed';
import { DeleteOutlined } from '@ant-design/icons';
import { removeFeedAction } from '../../state/feeds';
import { store } from '../../state';
import Directory from '../../components/Directory';

const Settings = () => {
  const feeds = useSelector((state) => state.feeds);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Delete',
      key: 'action',
      render: (text, record) => {
        return (
        <Space size="middle">
            <DeleteOutlined onClick={() => store.dispatch(removeFeedAction(record.url))} />
            {record.key}
          </Space>
        )
      }
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
        <Table pagination={false} columns={columns} dataSource={feeds} style={{width: '100%'}} />
        <InputFeed />
      </IonContent>
    </IonPage>
  );
};

export default Settings;

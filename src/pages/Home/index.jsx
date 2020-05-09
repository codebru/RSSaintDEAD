import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton
} from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { SettingOutlined } from '@ant-design/icons';
import Feed from '../../components/Feed';
import InputFeed from '../../components/InputFeed';
import './Style.css';

const Home = () => {
  const feeds = useSelector((state) => state.feeds);
  const articles = useSelector((state) => state.articles);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BBC Africa</IonTitle>
          <IonButtons slot="primary">
            <IonButton color="secondary" routerLink="/settings" >
              <SettingOutlined />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">BBC Africa</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Feed articles={articles} />
      </IonContent>
    </IonPage>
  );
};

export default Home;

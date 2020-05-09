import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  useIonViewWillEnter,
} from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { SettingOutlined, ReloadOutlined } from '@ant-design/icons';
import Feed from '../../components/Feed';
import InputFeed from '../../components/InputFeed';
import { getAllArticles, getArticles } from '../../utilities/feeds';
import './Style.css';

const Home = () => {
  const feeds = useSelector((state) => state.feeds);
  const articles = useSelector((state) => state.articles);

  useIonViewWillEnter(getAllArticles);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>RSSaintDead</IonTitle>
          <IonButtons slot="primary">
            <IonButton color="secondary" routerLink="/settings" >
              <SettingOutlined />
            </IonButton>
            <IonButton color="primary" onClick={getAllArticles} >
              <ReloadOutlined />.
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">RSSaintDead</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Feed articles={articles} />
      </IonContent>
    </IonPage>
  );
};

export default Home;

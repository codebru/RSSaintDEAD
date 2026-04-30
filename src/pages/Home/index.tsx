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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SettingOutlined, ReloadOutlined } from '@ant-design/icons';
import Feed from '../../components/Feed';
import { getAllArticles } from '../../utilities/feeds';
import type { RootState } from '../../state';
import './Style.css';

const Home = () => {
  const feeds = useSelector((state: RootState) => state.feeds);
  const articles = useSelector((state: RootState) => state.articles);

  useIonViewWillEnter(() => {
    getAllArticles();
  });
  useEffect(() => {
    getAllArticles();
  }, [feeds]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>RSSaintDead</IonTitle>
          <IonButtons slot="primary">
            <IonButton color="secondary" routerLink="/settings">
              <SettingOutlined />
            </IonButton>
            <IonButton color="primary" onClick={() => getAllArticles()}>
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

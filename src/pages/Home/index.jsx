import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useSelector } from 'react-redux';
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
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">BBC Africa</IonTitle>
          </IonToolbar>
        </IonHeader>
        <InputFeed />
        <Feed articles={articles} />
      </IonContent>
    </IonPage>
  );
};

export default Home;

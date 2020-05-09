import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Feed from '../../components/Feed';
import './Style.css';

const Home = () => {
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
        <Feed />
      </IonContent>
    </IonPage>
  );
};

export default Home;

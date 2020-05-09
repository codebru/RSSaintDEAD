import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import {
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import Parser from 'rss-parser';
import Feed from '../../components/Feed';
import './Style.css';

const parser = new Parser();
// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const FEED = 'http://feeds.bbci.co.uk/news/world/africa/rss.xml';

async function getFeed(feedURL) {
  let feed = await parser.parseURL(`${CORS_PROXY}${feedURL}`);
  console.log(feed.items[0])
  return feed;
}

const Home = () => {
  const [feed, setFeed] = useState(null);
  useIonViewWillEnter(() => {
    async function data() {
      setFeed(await getFeed(FEED))
    }
    data();
  })
 
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
        <Feed feed={feed} />
      </IonContent>
    </IonPage>
  );
};

export default Home;

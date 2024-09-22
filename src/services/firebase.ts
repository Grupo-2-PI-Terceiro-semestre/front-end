import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyDkIgRuktdCNNm8slh7wyyfWPYhOD2Hq-0',
  authDomain: 'order-hub-175f2.firebaseapp.com',
  projectId: 'order-hub-175f2',
  storageBucket: 'order-hub-175f2.appspot.com',
  messagingSenderId: '156175922894',
  appId: '1:156175922894:web:d83c40a7e90444068d429f',
  measurementId: 'G-9RXZYFD3Z5'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
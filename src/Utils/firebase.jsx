import {initializeApp} from 'firebase/app'
import {getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhHoGsUTT7DhxU29KZ0NSSLKFyLuf3PwA",
  authDomain: "pro-exchange-a95a2.firebaseapp.com",
  databaseURL: "https://pro-exchange-a95a2-default-rtdb.firebaseio.com",
  projectId: "pro-exchange-a95a2",
  storageBucket: "pro-exchange-a95a2.firebasestorage.app",
  messagingSenderId: "702187060474",
  appId: "1:702187060474:web:ed1a033cafec703a3cdd43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
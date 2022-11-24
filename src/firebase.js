import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBhoCM3rmdAODPlelIcSP9DUa8iqTnRSTY",
  authDomain: "userform-cf9cd.firebaseapp.com",
  databaseURL: "https://userform-cf9cd-default-rtdb.firebaseio.com",
  projectId: "userform-cf9cd",
  storageBucket: "userform-cf9cd.appspot.com",
  messagingSenderId: "533937689042",
  appId: "1:533937689042:web:b8e7057cbd29d70cb8b80b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
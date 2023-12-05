import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCOR5lZqc5ovnF5LTC5ocU1EztpUb-hPVs",
  authDomain: "self-care-housekeeping.firebaseapp.com",
  projectId: "self-care-housekeeping",
  storageBucket: "self-care-housekeeping.appspot.com",
  messagingSenderId: "658325416592",
  appId: "1:658325416592:web:69491a7c5f751469794615",
  measurementId: "G-QKW4EZP2SC"

  // apiKey: "AIzaSyD9qsjidur11bq2Mji5nPEzduoBdH07kwU",
  // authDomain: "cleaningservice-admin-panel.firebaseapp.com",
  // projectId: "cleaningservice-admin-panel",
  // storageBucket: "cleaningservice-admin-panel.appspot.com",
  // messagingSenderId: "1044804232348",
  // appId: "1:1044804232348:web:43cf2c517aaac27154b959"
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const db = getFirestore(app);


export const auth = getAuth(app)
export default app


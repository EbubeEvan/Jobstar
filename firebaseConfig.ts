import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr8iWMMRZkz0y-U8o2ROIiHAZCCYewfJc",
  authDomain: "jobstar-a8fca.firebaseapp.com",
  projectId: "jobstar-a8fca",
  storageBucket: "jobstar-a8fca.appspot.com",
  messagingSenderId: "137446854007",
  appId: "1:137446854007:web:e719feb7222eb45466e572"
};

// Initialize Firebase
export const FIRERBASE_APP = initializeApp(firebaseConfig);
// export const FIRERBASE_AUTH = getAuth(FIRERBASE_APP)

export const auth = initializeAuth(FIRERBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(FIRERBASE_APP);
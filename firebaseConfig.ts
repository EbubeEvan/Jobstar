import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

const extras = Constants.expoConfig?.extra

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: extras?.EXPO_PUBLIC_API_KEY || "",
  authDomain: extras?.EXPO_PUBLIC_AUTH_DOMAIN || "",
  projectId: extras?.EXPO_PUBLIC_PROJECT_ID || "",
  storageBucket: extras?.EXPO_PUBLIC_STOARGE_BUCKET || "",
  messagingSenderId: extras?.EXPO_PUBLIC_MESSAGING_SENDER_ID || "",
  appId: extras?.EXPO_PUBLIC_APP_ID  || ""
};

// Initialize Firebase
export const FIRERBASE_APP = initializeApp(firebaseConfig);
// export const FIRERBASE_AUTH = getAuth(FIRERBASE_APP)

export const auth = initializeAuth(FIRERBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(FIRERBASE_APP);
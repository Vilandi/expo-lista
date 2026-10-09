import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

// No Expo, só variáveis que começam com EXPO_PUBLIC_ chegam ao app.
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

// Cloud Firestore (e NÃO o Realtime Database).
// A detecção automática de long polling evita problemas de conexão no React Native.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
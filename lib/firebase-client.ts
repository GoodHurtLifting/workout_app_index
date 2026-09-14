import {
  type FirebaseApp,
  getApp,
  getApps,
  initializeApp,
  type FirebaseOptions,
} from "firebase/app";
import { getAuth } from "firebase/auth";

function explicitLocalConfig(): FirebaseOptions | undefined {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) return undefined;

  return {
    apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
}

export function getClientAuth() {
  const localConfig = explicitLocalConfig();
  const initializeFromAppHosting = initializeApp as () => FirebaseApp;
  const app = getApps().length
    ? getApp()
    : localConfig
      ? initializeApp(localConfig)
      : initializeFromAppHosting();
  return getAuth(app);
}

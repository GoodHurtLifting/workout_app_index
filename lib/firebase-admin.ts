import "server-only";
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function adminApp(){
  return getApps()[0] ?? initializeApp({
    credential: applicationDefault(),
    projectId: process.env.GCLOUD_PROJECT ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export function getAdminAuth(){ return getAuth(adminApp()); }
export function getAdminFirestore(){ return getFirestore(adminApp()); }

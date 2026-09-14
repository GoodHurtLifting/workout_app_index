"use client";

import { Suspense, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { getClientAuth } from "@/lib/firebase-client";
import "../admin.css";

function AdminLoginForm(){
  const params=useSearchParams();
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  const returnTo=params.get("returnTo")?.startsWith("/")?params.get("returnTo")!:"/admin";
  async function signIn(){
    setBusy(true); setError("");
    try {
      const result=await signInWithPopup(getClientAuth(),new GoogleAuthProvider());
      const response=await fetch("/api/auth/session",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({idToken:await result.user.getIdToken()})});
      if(!response.ok) throw new Error((await response.json()).error??"Sign-in failed");
      window.location.assign(returnTo);
    } catch (cause) {
      setError(cause instanceof Error?cause.message:"Sign-in failed");
      setBusy(false);
    }
  }
  return <main className="admin-page standalone-admin"><section className="admin-login"><p className="eyebrow">PRIVATE CATALOG</p><h1>Research dashboard</h1><p>Sign in with the authorized Google account to manage catalog research and publication.</p><button className="admin-primary" type="button" disabled={busy} onClick={signIn}>{busy?"Signing in…":"Sign in with Google"}</button>{error?<p role="alert">{error}</p>:null}</section></main>;
}

export default function AdminLoginPage(){
  return <Suspense fallback={<main className="admin-page standalone-admin"><section className="admin-login"><p>Loading sign-in…</p></section></main>}><AdminLoginForm/></Suspense>;
}

"use client";
import {useEffect,useRef} from "react";
import {trackCommercialEvent} from "@/lib/commercial-analytics";
export function CommercialPageView() {
 const recorded=useRef(false);
 useEffect(()=>{
  const send=()=>{if(!recorded.current && trackCommercialEvent("services_page_viewed","services")) recorded.current=true;};
  send(); window.addEventListener("wai:analytics-ready",send);
  return ()=>window.removeEventListener("wai:analytics-ready",send);
 },[]);
 return null;
}

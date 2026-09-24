"use client";

import { useEffect, useRef } from "react";

type Placement = "home" | "browse" | "profile";

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
const slots: Record<Placement, string | undefined> = {
  home: process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT_ID,
  browse: process.env.NEXT_PUBLIC_ADSENSE_BROWSE_SLOT_ID,
  profile: process.env.NEXT_PUBLIC_ADSENSE_PROFILE_SLOT_ID,
};

export function AdSlot({ placement }: { placement: Placement }) {
  const element = useRef<HTMLModElement>(null);
  const slotId = slots[placement];

  useEffect(() => {
    if (!enabled || !clientId || !slotId || !element.current || element.current.dataset.requested) return;
    element.current.dataset.requested = "true";
    try {
      const adWindow = window as Window & { adsbygoogle?: Record<string, never>[] };
      (adWindow.adsbygoogle ||= []).push({});
    } catch (error) {
      console.error("AdSense could not initialize this placement", error);
    }
  }, [slotId]);

  if (!enabled || !clientId || !slotId) return null;

  return (
    <aside className={`advertisement advertisement-${placement}`} aria-label="Advertisement">
      <p>Advertisement</p>
      <ins
        ref={element}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

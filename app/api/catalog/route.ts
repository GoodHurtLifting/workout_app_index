import { NextResponse } from "next/server";
import { apps } from "@/lib/catalog";
import { getLatestPublishedCatalog } from "@/lib/catalog-repository";

export const dynamic="force-dynamic";

export async function GET(){
  try {
    const published=await getLatestPublishedCatalog();
    return NextResponse.json({apps:published?.length?published:apps,source:published?.length?"published":"preliminary"});
  } catch {
    return NextResponse.json({apps,source:"preliminary"});
  }
}

"use client";

import { insertLocalLinks } from "@/app/actions";
import { Session } from "next-auth";
import { useEffect } from "react";

export default function GetStorage({ session }: { session: Session | null }) {
  useEffect(() => {
    let g = JSON.parse(localStorage.getItem("all-links") || "[]");

    if (session && g.length > 0) {
      insertLocalLinks(g.filter((e: any) => e)).then(console.log);
      localStorage.setItem("all-links", "[]");
    }
  });

  return "";
}

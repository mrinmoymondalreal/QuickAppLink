"use client";

import { useEffect } from "react";

export default function OpenInApp({
  data,
}: {
  data: {
    original_url: any;
    openInApp: any;
  } | null;
}) {
  let link = `intent://${data?.original_url
    .replace("https://", "")
    .replace("http://", "")}/#Intent;package=${
    (data as any)?.android
  };scheme=https;end`;

  useEffect(() => {
    location.href = link;

    let time = setTimeout(() => {
      location.href = data?.original_url;
    });

    return () => clearTimeout(time);
  });

  return <a href={link}>Open In App</a>;
}

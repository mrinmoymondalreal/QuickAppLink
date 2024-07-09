let cache: { [key: string]: { android: string } } = {
  "www.youtube.com": { android: "com.google.android.youtube" },
  "www.facebook.com": { android: "com.facebook.katana" },
  "www.instgram.com": { android: "com.instagram.android" },
  "www.messager.com": { android: "com.facebook.orca" },
  "www.twitter.com": { android: "com.twitter.android" },
  "www.whatsapp.com": { android: "com.whatsapp" },
  "www.telegram.com": { android: "org.telegram.messenger" }
}

export function getAppLink(url: string){

  let location = new URL(url);

  return cache[location.hostname];
}
"use server";
import database from "@/mongo";
import { getAppLink } from "@/utils";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

function makeId(len: number = 4){
  let str = "12345678901qwertyuiopasdfghjklzxcvbnm_";
  let res = "";
  for(let i = 0;i < len;i++){
    res += str.charAt(Math.floor(Math.random() * (str.length - 1)))
  }

  return res;
}

export type MessageState = {
  status: boolean;
  error?: string;
  url?: string;
  user?: string | null;
  id?: ObjectId
};

export async function getLink(path: string){
  let data = await database.collection("urls").findOne({path});
  if(!data) return null;
  await database.collection('urls').updateOne(
    { _id: data._id },
    { $set: { 'total_visitors': data.total_visitors + 1 } }
  );
  let links = {};
  if(data?.openInApp) links = getAppLink(data?.original_url);
  let resp = {
    original_url: data?.original_url,
    openInApp: data?.openInApp,
    ...links
  };
  return resp;
}

export async function getLinks(){
  const session = await getServerSession();

  let data = await database.collection("urls").find({user: session?.user?.email}).toArray();
  return data;
}

export async function insertLink(currentState: { message: MessageState }, data: FormData) {

  let original_url = data.get('original_url');
  let path = data.get('path');
  path = path?.toString().trim().length == 0 ?  makeId(5) : path;
  let openInApp = data.get('isAppOpener') == "true" ? true : false; 

  try{
    new URL(original_url?.toString() || "");
  }catch(err){
    return { message: { status: false, error: "URL is not valid" } }
  }

  if(!(/^[a-zA-Z0-9\-_]+$/.test(path?.toString() || ""))) return { message: { status: false, error: "Custom URL not valid only alphabet, numbers, - (hypes) and _ (underscore) is valid" } }

  let session = await getServerSession();

  if(!session && (data.get('path') || "").toString().trim().length > 0){
    return { message: { status: false, error: "Without Login, Cannot shorten links with custom URL. Login to create custom URL" } }
  }

  try{
    let resp = await database.collection('urls').findOne({ path: path });
    if(resp) return { message: { status: false, error: "Custom URL Exists Try Writing Another Custom URL" } };

    let insert_resp = await database.collection('urls').insertOne({ original_url, path, openInApp, user: session?.user?.email || null, total_visitors: 0, created_at: new Date() });
    
    revalidatePath('/');
    return { message: { status: insert_resp.acknowledged, url: path?.toString(), user: session?.user?.email || null, id: insert_resp.insertedId } };
  }catch(err){
    return { message: { status: false, error: "Unexpected Error!!" } };
  }

}

export async function deleteLink(data: FormData){

  let id = data.get('id') || "";
  let session = await getServerSession();

  if(!session) return null;

  let resp = await database.collection('urls').deleteOne({ _id: new ObjectId(id.toString()), user: session?.user?.email });
  // if() resp.acknowledged

  revalidatePath('/');
}

export async function insertLocalLinks(links: string[]){
  const session = await getServerSession();
  const coll = database.collection("urls");
  if(session){
    links.forEach(async (link: string) => {
      await coll.updateOne({ _id: new ObjectId(link) }, { $set: { user: session.user?.email } })
    });
  }

  revalidatePath('/');
  return "DONE";
}
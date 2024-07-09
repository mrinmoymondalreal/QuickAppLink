import { redirect } from "next/navigation";
import { getLink } from "../actions";
import { headers } from "next/headers";
import OpenInApp from "@/components/OpenINApp";

export default async function Page({ params }: { params: { path: string } }) {
  let data = await getLink(params.path);

  if (!data) return "URL not found or Premanantly Removed";

  if (
    headers().get("user-agent")?.toString().toLowerCase().indexOf("android") ==
      -1 ||
    !data.openInApp
  ) {
    redirect(data.original_url);
    return "redirecting";
  }

  return <OpenInApp data={data} />;
}

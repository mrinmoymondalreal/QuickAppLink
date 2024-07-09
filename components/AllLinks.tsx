import { deleteLink, getLinks } from "@/app/actions";
import { Session } from "next-auth";
import { headers } from "next/headers";

function getDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-IN", options);
}

export default async function AllLinks({
  session,
}: {
  session: Session | null;
}) {
  if (!session) return "";

  let data = await getLinks();

  let host = process.env.NEXTAUTH_URL;

  if (!data) return "";

  return (
    <section
      id="all-links"
      className="h-screen w-full bg-gray-100 flex flex-col justify-center items-center"
    >
      <div className="heading font-black uppercase text-2xl tracking-wider">
        Your Links
      </div>

      <div className="w-full md:w-[70%] max-h-[80%] pt-8 overflow-y-scroll">
        <table
          className="w-full border-spacing-6"
          cellSpacing="pixels"
          cellPadding={15}
        >
          <tbody className="border-spacing-9">
            <tr className="border-b-2 border-black">
              <th>Date</th>
              <th>Shorten URL</th>
              <th className="w-24"></th>
              <th>Original URL</th>
              <th>Total Visitors</th>
              <th>Action</th>
            </tr>

            {data.length == 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  No records found. Try adding new URLs
                </td>
              </tr>
            )}

            {data.map(
              ({ created_at, original_url, path, total_visitors, _id }, i) => {
                return (
                  <tr className="hover:bg-gray-300 border-spacing-9" key={i}>
                    <td className="text-center">{getDate(created_at)}</td>
                    <td className="text-center">
                      <a
                        href={`${host}/${path}`}
                        target="_blank"
                        className="hover:underline"
                      >
                        {host}/{path}
                      </a>
                    </td>
                    <td className="text-center text-2xl font-black">&rArr;</td>
                    <td className="text-center">{original_url}</td>
                    <td className="text-center">{total_visitors}</td>
                    <td className="text-center">
                      <form action={deleteLink}>
                        <input type="hidden" name="id" value={_id.toString()} />
                        <button type="submit">&#x1F5D1;</button>
                      </form>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

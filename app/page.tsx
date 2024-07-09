import AllLinks from "@/components/AllLinks";
import GetStorage from "@/components/CheckLocalStorage";
import SignButton from "@/components/Sign";
import URLForm from "@/components/URLForm";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main>
      <GetStorage session={session} />
      <header className="w-full h-14 flex justify-center items-center font-semibold border-b border-black">
        <div className="">QuickAppLink</div>
        <div className="absolute right-0 mr-4">
          <SignButton session={session} />
        </div>
      </header>
      <section
        id="cover"
        className="w-full relative lg:h-[calc(100vh-56px)] min-h-[calc(100vh-206px)] h-fit px-6 lg:px-14 flex flex-col lg:flex-row justify-center items-center"
      >
        {session && (
          <div className="lg:absolute lg:top-0 mt-6 text-lg">
            👋 Welcome back, {session!.user!.name}
          </div>
        )}

        <div className="text-2xl font-bold flex-1 px-2 lg:px-8 text-center flex flex-col justify-center items-center mt-6 lg:mt-0">
          <div className="">
            <div className="text-4xl lg:text-5xl uppercase font-black mb-3">
              Shorten Link
            </div>
            <div>
              which open directly in{" "}
              <span className="text-4xl lg:text-5xl uppercase font-black">
                App
              </span>
            </div>
          </div>
          <div className="text-3xl mt-4">
            Login to create{" "}
            <span className="text-3xl lg:text-4xl uppercase font-black">
              custom Short Link
            </span>
          </div>
          <div className="mt-4 text-xl uppercase lg:mt-8 space-x-2">
            <SignButton session={session} />
          </div>
        </div>
        <URLForm />

        {session && (
          <a
            href="#all-links"
            className="lg:absolute lg:bottom-0 mt-12 lg:mt-0 mb-8 -space-y-1 h-fit animate-bounce cursor-pointer"
          >
            <div>See your shorten links</div>
            <div className="text-2xl origin-center rotate-90 w-fit h-fit relative left-1/2 -translate-x-1/2">
              &raquo;
            </div>
          </a>
        )}
      </section>
      <AllLinks session={session} />
    </main>
  );
}

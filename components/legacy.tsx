export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <section className="flex flex-col items-center w-[400px] max-w-full space-y-6">
        <h1 className="text-3xl font-bold uppercase">SIGN UP</h1>
        <form className="flex flex-col w-full space-y-4" action="">
          <input
            type="text"
            className="w-full h-12 rounded-md border border-gray-600 px-4 outline-none"
            placeholder="Name"
          />
          <input
            type="text"
            className="w-full h-12 rounded-md border border-gray-600 px-4 outline-none"
            placeholder="Email"
          />
          <input
            type="text"
            className="w-full h-12 rounded-md border border-gray-600 px-4 outline-none"
            placeholder="Role"
          />
          <input
            type="text"
            className="w-full h-12 rounded-md border border-gray-600 px-4 outline-none"
            placeholder="Password"
          />
          <div className="flex text-sm my-0">
            <a href="#" className="flex-1 hover:underline">
              Already have a Account? Log In
            </a>
          </div>
          <input
            type="submit"
            value="LOG IN"
            className="border border-black px-3 py-3 w-full rounded-md bg-black text-white cursor-pointer"
          />
        </form>
      </section>
      <section className="my-6 relative w-[400px] h-fit flex ">
        <div className="absolute h-px w-full bg-black"></div>
        <div className="absolute bg-white px-2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-fiit h-fit">
          or
        </div>
      </section>
      <section>
        <button>Login With Google</button>
      </section>
    </main>
  );
}

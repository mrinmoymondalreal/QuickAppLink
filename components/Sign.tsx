"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function SignButton({ session }: { session: Session | null }) {
  return (
    <button
      type="button"
      className="border border-black px-2 py-1 rounded-md hover:bg-black hover:text-white"
      onClick={() => {
        session ? signOut() : signIn();
      }}
    >
      {session ? "Sign Out" : "Sign In"}
    </button>
  );
}

"use client";

import { insertLink, MessageState } from "@/app/actions";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function URLForm() {
  const { pending } = useFormStatus();
  const initialState: { message: MessageState } = {
    message: { status: false, error: "" },
  };
  const [formState, formAction] = useFormState(insertLink, initialState);

  let host = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

  useEffect(() => {
    let g = JSON.parse(localStorage.getItem("all-links") || "[]");
    if (formState.message.user == null) {
      if (formState.message.id && !g.includes(formState.message.id)) {
        g.push(formState.message.id);
        localStorage.setItem("all-links", JSON.stringify(g));
      }
    }
  });

  return (
    <form
      action={formAction}
      className="bg-gray-100 rounded-md lg:w-[40%] w-full box-border flex flex-col flex-shrink space-y-2 h-fit px-4 py-8 lg:mr-12 mt-6 lg:mt-0"
    >
      <input
        type="text"
        className="w-full h-12 rounded-md shadow-md px-4 outline-none"
        name="original_url"
        placeholder="Enter URL to Shorten...."
      />
      <div className="w-full space-y-2 flex items-center space-x-2">
        <input
          type="text"
          name="path"
          className="flex-1 max-w-[50%] h-12 rounded-md shadow-md px-4 outline-none"
          placeholder="Custom URL"
        />
        <select
          className="flex-1 h-12 w-[45%] rounded-md shadow-md px-4 relative -top-1 outline-none"
          name="isAppOpener"
        >
          <option value="true">Open in App</option>
          <option value="false">Open normally</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="border border-black px-3 py-3 w-full rounded-md bg-gray-200 cursor-pointer"
      >
        Shorten
      </button>

      {formState?.message && (
        <div className="flex w-full justify-center">
          {!formState.message.status && (
            <div className="text-red-700">{formState.message.error}</div>
          )}
          {formState.message.status && (
            <div>
              <div>Got Shorten URL:</div>
              <a
                className="hover:underline"
                href={`${host}/${formState?.message?.url}`}
              >
                {host}/{formState?.message?.url}
              </a>
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${host}/${formState?.message?.url}`
                  );
                }}
              >
                &#x1f4cb;
              </span>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

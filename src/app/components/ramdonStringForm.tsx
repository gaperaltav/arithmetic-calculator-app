"use client";

import { useState } from "react";
import { User } from "../global-types";

export default function RandomStringForm({ user, refreshInfo }: { user: User, refreshInfo: Function }) {
  const [result, setResut] = useState<string>("");

  const onSubmitRandomString = () => {
    fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/v1/random-strings`, {
      method: "POST",
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((data) => {
       const { result } = data;
        setResut(result)
        refreshInfo()
      }).catch(err => console.log(JSON.parse(err)));
  };

  return (
    <div className="addition-form">
      <form className="max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <button
              type="button"
              className={`bg-blue-500 h-[35px] hover:bg-blue-700 w-31 max-md:w-15 text-white font-bold py-1 px-2 rounded mx-1 disabled:bg-gray-300 disabled:cursor-not-allowed`}
              onClick={onSubmitRandomString}
            >
              Generate Ramdon text
            </button>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Result
            </label>
            <textarea
             cols={60}
             rows={20}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              value={result}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function MultiplicationForm({ user, refreshInfo }: { user: User, refreshInfo: Function }) {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [result, setResut] = useState<number>(0);

  const onSubmitAddition = () => {
    fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/v1/multiplications`, {
      method: "POST",
      body: JSON.stringify({ firstNumber, secondNumber, user }),
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
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Number
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              value={firstNumber}
              onChange={(e) => setFirstNumber(Number(e.target.value))}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Second number
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="number"
              value={secondNumber}
              onChange={(e) => setSecondNumber(Number(e.target.value))}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <button
              type="button"
              className={`bg-blue-500 h-[35px] hover:bg-blue-700 w-31 max-md:w-15 text-white font-bold py-1 px-2 rounded mx-1 disabled:bg-gray-300 disabled:cursor-not-allowed`}
              onClick={onSubmitAddition}
            >
              Run Multiplication
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
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              value={result}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
}

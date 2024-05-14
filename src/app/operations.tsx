"use client";

import { ChangeEvent, useState } from "react";
import AdditionForm from "./components/addition-form";
import { useSession } from "next-auth/react";
import SubtractionForm from "./components/subtraction-form";

interface OpSelectItem {
  addition: () => JSX.Element;
  subtraction: () => JSX.Element;
}

const operations: OpSelectItem = {
  addition: AdditionForm,
  subtraction: SubtractionForm,
};

export default function Operations() {
    const { data } = useSession();
  const [currentOp, setCurrentOp] = useState("addition");
  const SelectedOperation = operations[currentOp];

  const onChangeOp = (event: ChangeEvent<HTMLElement>) => {
    const { value } = event.target as HTMLInputElement;
    setCurrentOp(value);
  };

  console.log({ reactSession: data });

  return (
    <>
      <div className="flex align-center">
        <div className="px-5">
          <label htmlFor="operations">Select Operation:</label>
          <select
            name="select-operation"
            onChange={onChangeOp}
            className="ml-5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="none">- Select Operation -</option>
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
          </select>
          <div id="operation-form" className="w-100 mt-5">
            {currentOp !== "none" && <SelectedOperation />}
          </div>
        </div>
      </div>
    </>
  );
}

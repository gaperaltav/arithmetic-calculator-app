"use client";

import { ChangeEvent, useEffect, useState } from "react";
import AdditionForm from "./components/additionForm";
import { useSession } from "next-auth/react";
import SubtractionForm from "./components/subtractionForm";
import UserBalance from "./components/userBalance";
import { users } from "@/db/schema";
import { getUserByEmail } from "./components/actions/userActions";

interface OpSelectItem {
  addition: () => JSX.Element;
  subtraction: () => JSX.Element;
}

const operations: OpSelectItem = {
  addition: AdditionForm,
  subtraction: SubtractionForm,
};

export default function Operations() {
  const [user, setUser ] = useState<typeof users.$inferSelect | null >(null);
  const { data } = useSession();
  const [currentOp, setCurrentOp] = useState("addition");
  const SelectedOperation = operations[currentOp];

  const onChangeOp = (event: ChangeEvent<HTMLElement>) => {
    const { value } = event.target as HTMLInputElement;
    setCurrentOp(value);
  };

  const getUserInfo = async(email: string) => {
   const userFromDb = await getUserByEmail(email)
   setUser(userFromDb)
  }

  useEffect(() => {
    const email = data?.user?.email!
    getUserInfo(email)
  }, [])

  return (
    <>
      <UserBalance balance={user?.balance!} />
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

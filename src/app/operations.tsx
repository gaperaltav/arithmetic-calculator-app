"use client";

import { ChangeEvent, useEffect, useState } from "react";
import AdditionForm from "./components/additionForm";
import { useSession } from "next-auth/react";
import SubtractionForm from "./components/subtractionForm";
import UserBalance from "./components/userBalance";
import { users } from "@/db/schema";
import { getUserByEmail } from "./components/actions/userActions";
import MultiplicationForm from "./components/multiplicationForm";

interface OpProps {
  user: User;
  refreshInfo: Function;
}

interface OpSelectItem {
  addition: ({ user, refreshInfo }: OpProps) => JSX.Element;
  subtraction: ({ user, refreshInfo }: OpProps) => JSX.Element;
  multiplication:  ({ user, refreshInfo }: OpProps) => JSX.Element;
}

const operations: OpSelectItem = {
  addition: AdditionForm,
  subtraction: SubtractionForm,
  multiplication: MultiplicationForm
};

export default function Operations() {
  const [user, setUser] = useState<typeof users.$inferSelect | null>(null);
  const { data } = useSession();
  const [currentOp, setCurrentOp] = useState("none");
  const SelectedOperation = operations[currentOp];

  const onChangeOp = (event: ChangeEvent<HTMLElement>) => {
    const { value } = event.target as HTMLInputElement;
    setCurrentOp(value);
  };

  const fetchUserData = async () => {
    const email = data?.user?.email!;
    const userFromDb = await getUserByEmail(email);
    setUser(userFromDb);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="flex align-center">
        <div className="px-5">
          <UserBalance balance={user?.balance!} />
          <label htmlFor="operations">Select Operation:</label>
          <select
            name="select-operation"
            onChange={onChangeOp}
            className="ml-5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="none">- Select Operation -</option>
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="multiplication">Multiplication</option>
          </select>
          <div id="operation-form" className="w-100 mt-5">
            {currentOp !== "none" && (
              <SelectedOperation
                user={user}
                refreshInfo={() => fetchUserData()}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

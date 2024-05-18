"use client";
import { users } from "@/db/schema";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserByEmail } from "../components/actions/userActions";
import FormHeader from "../components/formHeader";

export default function Operations() {
  const [user, setUser] = useState<typeof users.$inferSelect | null>(null);
  const [records, setRecords] = useState<(typeof records.$inferSelect)[]>([]);

  const { data } = useSession();

  const fetchUserData = async () => {
    const email = data?.user?.email!;
    getUserByEmail(email)
      .then((userData) => {
        setUser(userData);
        return userData;
      })
      .then((res) =>
        fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/v1/records`, {
          method: "POST",
          body: JSON.stringify({ userId: res.id }),
        }).then((res) => res.json())
      )
      .then((recordsData) => setRecords(recordsData));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="flex align-center">
        <div className="px-5">
          <FormHeader balance={user?.balance!} />
          <table className="table-auto">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Amount</th>
                <th>Balance</th>
                <th>response</th>
              </tr>
            </thead>
            <tbody>
              { records.length > 0 && records.map((record: typeof records.$inferSelect) => (
                <tr key={record.id}>
                  <td>{record.operationId}</td>
                  <td>{record.amount}</td>
                  <td>{record.balance}</td>
                  <td>{record.operationResponse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

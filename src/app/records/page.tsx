"use client";
import { users } from "@/db/schema";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserByEmail } from "../components/actions/userActions";
import FormHeader from "../components/formHeader";
const API_URL = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/v1/`;

export default function Operations() {
  const [user, setUser] = useState<typeof users.$inferSelect | null>(null);
  const [records, setRecords] = useState<(typeof records.$inferSelect)[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const pageSize = 8;

  const { data } = useSession();

  const fetchUserData = async () => {
    const email = data?.user?.email!;
    getUserByEmail(email)
      .then((userData) => {
        setUser(userData);
        return userData;
      })
      .then((res) =>
        fetch(`${API_URL}records`, {
          method: "POST",
          body: JSON.stringify({ userId: res.id, page: currentPage, pageSize }),
        }).then((res) => res.json())
      )
      .then((recordsData) => {
        setTotalPages([...Array(Math.ceil(recordsData.total / pageSize))]);
        setRecords(recordsData.records);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [currentPage]);

  return (
    <>
      <div className="w-full">
        <div className="px-5">
          <FormHeader balance={user?.balance!} />
          <table className="table-auto 	border-separate border-solid border-1 border-sky-500">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Amount</th>
                <th>Balance</th>
                <th>response</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 &&
                records.map((record: typeof records.$inferSelect) => (
                  <tr key={record.id}>
                    <td>{record.operationId}</td>
                    <td>{record.amount}</td>
                    <td>{record.balance}</td>
                    <td>{record.operationResponse}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ul className="flex flex-row gap-x-2 mt-3">
            <li>
              {currentPage > 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)}>
                  Prev
                </button>
              )}
            </li>
            {totalPages.length > 0 &&
              totalPages.map((e, index) => (
                <li key={index} className={currentPage - 1 === index ? `text-blue-500` : "text-[#999]"}>
                  <button onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            <li>
              <button onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

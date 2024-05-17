"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const { data } = useSession();
  return (
    <div className="w-[100] px-6 flex justify-between p-[10px] mb-[10px] bg-[#fff] h-[70px] mt-0">
      <div className="flex">
        <div className="content-center mx-2">
          <h1 className="font-bold">Arithmetic Calculator</h1>
        </div>
      </div>
      <div className="relative flex">
        <a className="bg-white block flex hover:text-gray-500">
          hello <strong className="ml-1">{`${data?.user?.name}`} </strong>
        </a>

        <Link className="ml-1" href={"#"} title="Sign out" onClick={() => signOut()}>
          <Image src="/logout.svg" width={25} height={25} alt="Sign out" />{" "}
        </Link>
      </div>
    </div>
  );
}

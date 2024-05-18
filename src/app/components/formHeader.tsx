"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FormHeader({ balance }: { balance: string }) {
  const pathname = usePathname();
  const href = pathname === "/records" ? "/" : "/records";
  const text = pathname === "/records" ? "Back" : "Records";

  return (
    <div className="flex justify-between  w-[100] ">
      <div>
        <Link href={href}>{text}</Link>
      </div>
      <div>
        <strong> Balance </strong>
        <span>{balance ? `$${balance}` : "$0.0"}</span>
      </div>
    </div>
  );
}

import db from "@/db";
import { operations, records, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
const ADDITION_ID: number = 1;

export async function GET(request: Request) {
  return NextResponse.json({ Welcome: "Welcome to additions API" });
}

export async function POST(request: Request) {
  const data = await request.json();
  const { firstNumber, secondNumber, user: currentUser } = data;

  const opCost = (await db
    .select()
    .from(operations)
    .where(
      eq(operations.id, ADDITION_ID)
    )) as (typeof operations.$inferSelect)[];

  const cost = opCost ? opCost[0].cost : "0";
  if (Number(cost) <= Number(currentUser.balance)) {
    const userBalance = (Number(currentUser.balance) - Number(cost)).toString();

    await db.insert(records).values({
      operationId: opCost[0].id,
      userId: currentUser.id,
      amount: cost,
      userBalance,
    });

    await db
      .update(users)
      .set({ balance: userBalance })
      .where(eq(users.id, currentUser.id));
  } else {
    return NextResponse.json(
      { message: "you don't have enought balance to continue" },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({ result: firstNumber + secondNumber });
}

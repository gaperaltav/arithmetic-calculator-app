import db from "@/db";
import { getOperationCost } from "@/services/operation-service";
import { insertNewRecord } from "@/services/record-service";
import { updateUserBalance } from "@/services/user-service";
import { NextResponse } from "next/server";
const ADDITION_ID: number = 1;

export async function GET(request: Request) {
  return NextResponse.json({ Welcome: "Welcome to additions API" });
}

export async function POST(request: Request) {
  const data = await request.json();
  const { firstNumber, secondNumber, user: currentUser } = data;

  const operation = await getOperationCost({ db, opType: ADDITION_ID });
  
  if (Number(operation.cost) <= Number(currentUser.balance)) {
    const userBalance = (
      Number(currentUser.balance) - Number(operation.cost)
    ).toString();

    await insertNewRecord({
      db,
      operation,
      userId: currentUser.id,
      userBalance,
    });
    await updateUserBalance({
      db,
      balance: userBalance,
      userId: currentUser.id,
    });
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

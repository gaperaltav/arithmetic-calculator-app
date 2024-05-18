import { OperationType } from "@/app/global-types";
import db from "@/db";
import { getOperationCost } from "@/services/operation-service";
import { insertNewRecord } from "@/services/record-service";
import { updateUserBalance } from "@/services/user-service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ Welcome: "Welcome to divisions API" });
}

export async function POST(request: Request) {
  const data = await request.json();
  const { firstNumber, secondNumber, user: currentUser } = data;
  const operation = await getOperationCost({
    db,
    opType: OperationType.division,
  });

  if (Number(operation.cost) <= Number(currentUser.balance)) {
    const userBalance = (
      Number(currentUser.balance) - Number(operation.cost)
    ).toString();

    const opResponse = Number(firstNumber) / Number(secondNumber);

    await insertNewRecord({
      db,
      operation,
      userId: currentUser.id,
      userBalance,
      operationResponse: opResponse.toString(),
    });
    await updateUserBalance({
      db,
      balance: userBalance,
      userId: currentUser.id,
    });

    return NextResponse.json({ result: opResponse });
  } else {
    return NextResponse.json(
      { message: "you don't have enought balance to continue" },
      {
        status: 500,
      }
    );
  }
}

import { OperationType } from "@/app/global-types";
import db from "@/db";
import { getOperationCost } from "@/services/operation-service";
import { insertNewRecord } from "@/services/record-service";
import { updateUserBalance } from "@/services/user-service";
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
   return NextResponse.json({ Welcome: 'Welcome to random strings API' })
}

export async function POST(request: Request) {
  const data = await request.json();
  const { user: currentUser } = data;
  const operation = await getOperationCost({ db, opType: OperationType.multiplication });

  if (Number(operation.cost) <= Number(currentUser.balance)) {
    const userBalance = (
      Number(currentUser.balance) - Number(operation.cost)
    ).toString();

    const req = await fetch(
      "https://www.random.org/strings/?num=10&len=12&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new"
    )
     const opResponse = await new Response(req.body).text();
     

    await insertNewRecord({
      db,
      operation,
      userId: currentUser.id,
      userBalance,
      operationResponse: opResponse,
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

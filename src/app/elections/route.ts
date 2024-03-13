import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { createElectionValidator } from "@packages/dto/elections.dto";

const prisma = new PrismaClient();

export async function GET() {
  const elections = await prisma.election.findMany();
  return NextResponse.json({ data: elections }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const parsedBody = createElectionValidator.safeParse(reqBody);

  if (!parsedBody.success) {
    return NextResponse.json({ message: parsedBody.error }, { status: 400 });
  }
  const electionData = parsedBody.data;

  const result = await prisma.election.create({ data: electionData });
  NextResponse.json(
    { result, message: "Election successfully created " },
    { status: 200 },
  );
}

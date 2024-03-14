"use server";

import prisma from "@lib/prisma";

export default async function getElections() {
  return await prisma.election.findMany();
}

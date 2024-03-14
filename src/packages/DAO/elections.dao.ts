"use server";

import prisma from "@lib/prisma";

export async function getElections() {
  return await prisma.election.findMany();
}

export async function getElectionsOptions() {
  const elections = await getElections();

  return elections.map((election) => ({
    name: election.name,
    value: election.id,
  }));
}

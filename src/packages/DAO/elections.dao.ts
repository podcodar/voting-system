"use server";

import prisma from "@lib/prisma";
import { CreateElection } from "@packages/entities/elections";
import { ElectionStatus } from "@prisma/client";
import { z } from "zod";

async function getElections() {
  return await prisma.election.findMany();
}

export async function getElectionsOptions() {
  const elections = await getElections();

  return elections.map((election) => ({
    name: election.name,
    value: election.id,
  }));
}

export async function createElection(formData: CreateElection) {
  const electionSchema = z.object({
    name: z.string(),
    candidates: z.array(z.string().uuid()),
  });
  const parsedFormData = electionSchema.parse(formData);

  return await prisma.election.create({
    data: {
      name: parsedFormData.name,
      candidates: {
        connect: parsedFormData.candidates.map((candidate) => ({
          id: candidate,
        })),
      },
    },
  });
}

export async function updateElectionStatus(electionId: string) {
  const updateElectionSchema = z.string().uuid();

  const parsedElectionId = updateElectionSchema.parse(electionId);

  await prisma.election.update({
    where: { id: parsedElectionId },
    data: {
      status: ElectionStatus.ONGOING,
    },
  });

  return parsedElectionId;
}

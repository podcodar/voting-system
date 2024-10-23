"use server";

import prisma from "@lib/prisma";
import {
  type FindElection,
  createElectionValidator,
  electionSchema,
  updateElectionSchema,
} from "@packages/dto/elections.dto";
import type { CreateElection } from "@packages/entities/elections";
import { BadRequestError, NotFound } from "@packages/utils/error";
import { ElectionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getElectionsOptions() {
  const elections = await getElections();
  return elections.map((election) => ({
    name: election.name,
    value: election.id,
  }));
}

export async function createElection(formData: CreateElection) {
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

export async function startElection(formData: FormData) {
  const electionId = String(formData.get("electionId"));
  const parsedElectionId = updateElectionSchema.safeParse(electionId);

  if (!parsedElectionId.success) {
    throw new BadRequestError(parsedElectionId.error.name);
  }

  await prisma.election.update({
    where: { id: parsedElectionId.data },
    data: {
      name: "Updated on server",
      status: ElectionStatus.ONGOING,
    },
  });

  redirect(`elections/${electionId}`);
}

async function getElections() {
  const res = await prisma.election.findMany();
  if (!res) {
    throw new NotFound("");
  }
  return res;
}
async function findByNameOrStatus({ name, status }: FindElection) {
  const resultElection = await getElections();
  const result = resultElection.find(
    (e) => e.name === name && e.status === status,
  );
  return result;
}
export async function addElection(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsedData = createElectionValidator.safeParse(data);
  if (!parsedData.success) {
    throw new BadRequestError(parsedData.error.name);
  }
  const electionExist = await findByNameOrStatus(parsedData.data).catch(
    (err: Error) => null,
  );
  if (electionExist) {
    throw new BadRequestError(parsedData.data.name);
  }

  await prisma.election.create({
    data: parsedData.data,
  });
  revalidatePath("/");
}

// async function updateElection() {
//   return await prisma.election.findMany();
// }

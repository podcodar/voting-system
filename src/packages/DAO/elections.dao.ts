"use server";

import prisma from "@lib/prisma";
import { createElectionValidator } from "@packages/dto/elections.dto";
import type { CreateElection } from "@packages/entities/elections";
import { BadRequestError, NotFound } from "@packages/utils/error";
import { ElectionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface FindElection {
  name: string;
  status: string;
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

export async function startElection(formData: FormData) {
  const electionId = String(formData.get("electionId"));
  const updateElectionSchema = z.string().uuid();
  const parsedElectionId = updateElectionSchema.parse(electionId);

  await prisma.election.update({
    where: { id: parsedElectionId },
    data: {
      name: "Updated on server",
      status: ElectionStatus.ONGOING,
    },
  });

  redirect(`http://localhost:3000/elections/${electionId}`);
}

async function getElections() {
  const res = await prisma.election.findMany();
  return res;
}

async function findByNameOrStatus({ name, status }: FindElection) {
  const resultElection = await getElections();
  console.log(resultElection);
  const result = resultElection.find(
    (e) => e.name === name && e.status === status,
  );
  return result;
}

export async function addElection(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsedData = createElectionValidator.safeParse(data); // Error empty input
  if (!parsedData.success) {
    throw new BadRequestError(parsedData.error.name);
  }
  const electionExist = await findByNameOrStatus(parsedData.data); // Error duplicate data
  if (electionExist) {
    throw new BadRequestError(parsedData.data.name); //fazer correção no AppError
  }

  await prisma.election.create({
    data: parsedData.data,
  });
  revalidatePath("/");
}

// async function updateElection() {
//   return await prisma.election.findMany();
// }

console.error;

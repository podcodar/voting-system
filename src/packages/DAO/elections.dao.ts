"use server";

import prisma from "@lib/prisma";
import type { CreateElection } from "@packages/entities/elections";
import { ElectionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
	console.log({ formData });
	const electionId = String(formData.get("electionId"));
	console.log({ electionId });

	const updateElectionSchema = z.string().uuid();
	const parsedElectionId = updateElectionSchema.parse(electionId);

	await prisma.election.update({
		where: { id: parsedElectionId },
		data: {
			name: "Updated on server",
			status: ElectionStatus.ONGOING,
		},
	});

	revalidatePath("/");
}

async function getElections() {
	return await prisma.election.findMany();
}

// async function updateElection() {
//   return await prisma.election.findMany();
// }

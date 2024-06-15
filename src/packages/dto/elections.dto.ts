import { z } from "zod";

export const createElectionValidator = z.object({
	name: z.string(),
	electionDay: z.date(),
});

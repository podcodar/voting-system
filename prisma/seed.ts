import { ElectionStatus, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const candidates: string[] = ["Candidate_1, Candidate_2, Candidate_3"];

async function main() {
  await prisma.election.create({
    data: {
      id: "824a-a25251e23013",
      name: "Election 4",
      status: ElectionStatus.FINISHED,
      candidates: {
        create: candidates.map((name) => ({ name })),
      },
    },
  });
}
main().then(async () => {
  await prisma.$disconnect();
});

import getElections from "@packages/DAO/elections.dao";
import HomePage from "@packages/components/HomePage";
import type { NextPage } from "next";

// TODO: Use prisma to get available elections in the database
// pass this data to HomePage component and render it
const ElectionsList = async () => {
  const elections = await getElections();
  console.log(elections);

  return (
    <ul>
      {elections.map((election) => (
        <li key={election.id}>{election.name}</li>
      ))}
    </ul>
  );
};

const Home: NextPage = async () => {
  return (
    <>
      <ElectionsList />
      <HomePage />;
    </>
  );
};

export default Home;

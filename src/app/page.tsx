import HomePage from "@packages/components/HomePage";
import ElectionForm from "@packages/components/HomePage/ElectionForm";
import NavBar from "@packages/components/navbar";
import type { NextPage } from "next";

const Home: NextPage = async () => {
  return (
    <>
      <NavBar />
      <HomePage>
        <ElectionForm />
      </HomePage>
    </>
  );
};

export default Home;

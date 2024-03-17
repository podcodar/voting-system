import ElectionForm from "@packages/components/HomePage/ElectionForm";
import type { NextPage } from "next";

const Home: NextPage = async () => {
  return (
    <>
      <div className="container">
        <ElectionForm />
      </div>
    </>
  );
};

export default Home;

import ElectionForm from "@packages/components/HomePage/ElectionForm";
import type { NextPage } from "next";

const Home: NextPage = async () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <ElectionForm />
      </div>
    </>
  );
};

export default Home;

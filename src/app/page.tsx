import ElectionForm from "@packages/components/HomePage/ElectionForm";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-screen content-center">
      <ElectionForm />
    </div>
  );
};

export default Home;

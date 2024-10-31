import ResultCard from "@packages/components/ResultCard";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] content-center">
      <div>
        <h1> Resultados da Eleição </h1>
        <ResultCard
          image="/image/avatar1.png"
          candidate="João Silva"
          vice="Maria Oliveira"
          party=" XYZ"
          percentagem="58%"
          votos="3,546"
        />
      </div>
    </div>
  );
};

export default Home;

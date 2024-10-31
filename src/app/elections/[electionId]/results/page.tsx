import ResultCard from "@packages/components/ResultCard";
import candidates from "src/data/data";
const Home = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-[80vh] content-center">
        <div>
          <h1 className="text-center text-xl p-16">Resultado da Eleição</h1>
          {candidates.map(
            ({ image, candidate, vice, party, percentagem, votos }) => (
              <div key={candidate} className="p-4">
                <ResultCard
                  image={image}
                  candidate={candidate}
                  vice={vice}
                  party={party}
                  percentagem={percentagem}
                  votos={votos}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

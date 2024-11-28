import { getCandidates } from "@packages/DAO/candidates.dao";
import ResultCard from "@packages/components/ResultCard";
const Home = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-[80vh] content-center">
        <div>
          <h1 className="text-center text-xl p-16">Resultado da Eleição</h1>
          {getCandidates().map(
            ({ image, candidate, vice, party, percentage, votes }) => (
              <div key={candidate} className="p-4">
                <ResultCard
                  image={image}
                  candidate={candidate}
                  vice={vice}
                  party={party}
                  percentagem={percentage}
                  votos={votes}
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

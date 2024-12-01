import { Avatar, AvatarImage } from "@packages/shadcn-ui/ui/avatar";
import { Card } from "@packages/shadcn-ui/ui/card";

interface ElectionResult {
  image: string;
  candidate: string;
  vice: string;
  party: string;
  percentagem: string;
  votos: string;
}
function ResultCard({
  candidate,
  vice,
  party,
  percentagem,
  votos,
  image,
}: ElectionResult) {
  return (
    <Card className="flex flex-row w-[60vw] p-4 shadow-md shadow-gray-200">
      <div className="flex w-[40vw] gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={image} />
        </Avatar>
        <div>
          <p className="font-bold">Presidente: {candidate}</p>
          <p className="text-sm">Vice: {vice}</p>
          <p className="text-xs">{party}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center w-1/2 gap-1">
        <p className="text-sm">
          Percentagem dos votos:{" "}
          <span className="font-bold">{percentagem}</span>
        </p>
        <p className="text-sm">
          Total de votos: <span className="font-bold">{votos}</span>
        </p>
      </div>
    </Card>
  );
}

export default ResultCard;

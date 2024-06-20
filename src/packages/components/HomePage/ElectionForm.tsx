import Button from "@components/Button";
import {
  getElectionsOptions,
  startElection,
} from "@packages/DAO/elections.dao";

export default async function ElectionForm() {
  const electionOptions = await getElectionsOptions();

  return (
    <div className="flex flex-col gap-14 justify-center content-center">
      <h1 className="font-bold text-xl w-full align">
        Selecione uma eleiceção
      </h1>

      <form action={startElection}>
        <div className="flex gap-7 flex-row">
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              name="electionId"
            >
              <option value={undefined}> Select an election</option>

              {electionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Dropdown Arrow</title>
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <Button type="submit">Iniciar Eleição</Button>
        </div>
      </form>
    </div>
  );
}

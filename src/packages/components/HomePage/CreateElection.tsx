import Button from "@components/Button";
import { ElectionStatus } from "@prisma/client";

export default async function CreateElection() {

  const electionsState = () => {
    const elections = [... Object.values(ElectionStatus)]
    return elections
  }
  return (
    <div className="flex pr-10 pl-10 pt-10 pb-10 flex-col gap-14 justify-center ring-1 ring-inset ring-gray-300 rounded-md border-0 py-1.5 pl-7 pr-20" >
      <h1 className="font-bold text-sl w-full align">
        Crie uma eleição
      </h1>
      <form>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
        <div className="sm:col-span-10">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Nome</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input type="text" name="username" id="username" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        </div>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-10">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Status</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              name="electionId"
            >
              <option value={undefined}> Select an election</option>
              {electionsState().map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        </div>
        </div>
        <div className="mt-10 flex gap-7 flex-row justify-center" >
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <Button type="submit">salvar</Button>
          </div>
      </form>
    </div>
  );
}

import { getElectionsOptions } from "@packages/dao/elections.dao";
import ElectionsSelect from "./ElectionSelect";

export default async function ElectionForm() {
  // TODO: Use server actions to submit form
  const electionOptions = await getElectionsOptions();

  return <ElectionsSelect options={electionOptions} />;
}

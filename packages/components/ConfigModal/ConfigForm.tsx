import { FormLabel, Input } from '@chakra-ui/react';

import {
  useConfigActions,
  useConfigStates,
} from '@packages/features/config-context';
import { IConfigForm } from '@packages/entities/config-modal';

export default function ConfigForm({ initialRef }: IConfigForm) {
  const { onConfigChange } = useConfigActions();
  const { electionDatabaseId, resultsDatabaseId } = useConfigStates();

  return (
    <>
      <FormLabel fontWeight="bold" mt="4">
        Eleições Database Id
      </FormLabel>
      <Input
        name="electionDatabaseId"
        placeholder="Digite o Id do database de eleições"
        ref={initialRef}
        value={electionDatabaseId}
        onChange={onConfigChange}
      />

      <FormLabel fontWeight="bold" mt="4">
        Resultados Database Id
      </FormLabel>
      <Input
        name="resultsDatabaseId"
        placeholder="Digite o Id do database de resultados"
        value={resultsDatabaseId}
        onChange={onConfigChange}
      />
    </>
  );
}

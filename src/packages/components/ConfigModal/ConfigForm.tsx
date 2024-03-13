import { FormLabel, Input } from '@chakra-ui/react';

import {
  useConfigActions,
  useConfigStates,
} from 'src/packages/features/config-context';
import { IConfigForm } from 'src/packages/entities/config-modal';

export default function ConfigForm({ initialRef }: IConfigForm) {
  const { onConfigChange } = useConfigActions();
  const { electionDatabaseId, resultsDatabaseId, notionApiKey } =
    useConfigStates();

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
      <FormLabel fontWeight="bold" mt="4">
        Chave Notion
      </FormLabel>
      <Input
        name="notionApiKey"
        placeholder="Digite o Id da chave Notion"
        value={notionApiKey}
        onChange={onConfigChange}
      />
    </>
  );
}

import Dexie, { Table } from 'dexie';
import Cookies from 'universal-cookie';

import { ConfigStates } from '@packages/features/config-context';
import { IConfig, IVotes } from '@packages/entities/indexedDb';
import {
  configContextToPersistence,
  configPersistenceToContext,
} from '@packages/utils/transformers';

export default class VSDatabase extends Dexie {
  configuration!: Table<IConfig, string>;
  votes!: Table<IVotes, number>;

  constructor() {
    super('VSDatabase');

    this.version(1).stores({
      configuration: '&name, value',
      votes: '&id, code ',
    });
  }
}

const cookies = new Cookies();
const db = new VSDatabase();

export async function getConfiguration(): Promise<ConfigStates> {
  const getResult = await db.configuration.bulkGet([
    'electionDatabaseId',
    'resultsDatabaseId',
    'notionApiKey',
  ]);

  const result = configContextToPersistence(getResult);
  return result;
}

export async function putConfiguration(
  configuration: ConfigStates,
): Promise<void> {
  const updateData = configPersistenceToContext(configuration);
  cookies.set('notionApiKey', configuration.notionApiKey, { path: '/' });
  await db.configuration.bulkPut(updateData);
}

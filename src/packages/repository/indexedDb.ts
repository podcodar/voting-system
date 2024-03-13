import Dexie, { Table } from 'dexie';
import { v4 as uuid } from 'uuid';

import { ConfigStates } from 'src/packages/features/config-context';
import { IConfig, IVote } from 'src/packages/entities/indexedDb';
import {
  configContextToPersistence,
  configPersistenceToContext,
} from 'src/packages/utils/transformers';

export default class VSDatabase extends Dexie {
  configuration!: Table<IConfig, string>;
  votes!: Table<IVote, string>;

  constructor() {
    super('VSDatabase');

    this.version(2).stores({
      configuration: '&name, value',
      votes: '&id, code, electionId',
    });
  }
}

const db = new VSDatabase();

export async function getConfiguration(): Promise<ConfigStates> {
  const getResult = await db.configuration.bulkGet([
    'electionDatabaseId',
    'resultsDatabaseId',
  ]);

  const result = configContextToPersistence(getResult);
  return result;
}

export async function putConfiguration(
  configuration: ConfigStates,
): Promise<void> {
  const updateData = configPersistenceToContext(configuration);
  await db.configuration.bulkPut(updateData);
}

export async function addVote(code: string, electionId: string) {
  const payload: IVote = {
    id: uuid(),
    code: code,
    electionId: electionId,
  };

  db.votes.add(payload);
}

export async function getVotes(electionId: string): Promise<IVote[]> {
  return await db.votes.where('electionId').equals(electionId).toArray();
}

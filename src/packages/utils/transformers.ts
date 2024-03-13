'use client';

import { IConfig } from 'src/packages/entities/indexedDb';
import { ConfigStates } from 'src/packages/features/config-context';

export function configPersistenceToContext(
  configuration: ConfigStates,
): IConfig[] {
  return Object.entries(configuration).map(
    ([key, value]) =>
      ({
        name: key,
        value: value,
      }) as IConfig,
  );
}

export function configContextToPersistence(
  config: (IConfig | undefined)[],
): ConfigStates {
  const [electionDatabaseId, resultsDatabaseId] = config;

  return {
    electionDatabaseId: electionDatabaseId?.value || '',
    resultsDatabaseId: resultsDatabaseId?.value || '',
  };
}

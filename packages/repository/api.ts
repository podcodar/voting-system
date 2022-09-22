import {
  GetAvailableElectionsResponse,
  GetElectionsPageResponse,
} from '@packages/entities/notion';

const ELECTIONS_URL = (databaseId: string) =>
  `/api/elections?databaseId=${databaseId}`;

const ELECTION_PAGE_URL = (pageId: string) =>
  `/api/elections/page?pageId=${pageId}`;

export const electionsApi = {
  getAvailableElections: async (databaseId: string) =>
    fetchData<GetAvailableElectionsResponse>(ELECTIONS_URL(databaseId), {
      method: 'GET',
    }),
  getElectionPage: async (pageId: string) =>
    fetchData<GetElectionsPageResponse>(ELECTION_PAGE_URL(pageId), {
      method: 'GET',
    }),
};

async function fetchData<T>(
  input: RequestInfo,
  init?: RequestInit | undefined,
): Promise<T | undefined> {
  const res = await fetch(input, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      'Content-type': 'application/json',
    },
  });

  // validate response
  if (!res.ok) {
    console.warn(`${res.status}: ${res.statusText}`);
    return;
  }

  return await res.json();
}

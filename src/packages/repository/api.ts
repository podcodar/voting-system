import {
  GetAvailableElectionsResponse,
  GetElectionsPageResponse,
  ResultElection,
} from "src/packages/entities/notion";

const ELECTIONS_URL = (databaseId: string) =>
  `/api/elections?databaseId=${databaseId}`;

const ELECTION_PAGE_URL = (pageId: string) =>
  `/api/elections/page?pageId=${pageId}`;

const RESULT_ELECTION_URL = (databaseId: string, electionId: string) =>
  `/api/elections/result?databaseId=${databaseId}&electionId=${electionId}`;

export const electionsApi = {
  getAvailableElections: async (databaseId: string) =>
    fetchData<GetAvailableElectionsResponse>(ELECTIONS_URL(databaseId), {
      method: "GET",
    }),
  getElectionPage: async (pageId: string) =>
    fetchData<GetElectionsPageResponse>(ELECTION_PAGE_URL(pageId), {
      method: "GET",
    }),
  postResultElection: async (
    databaseId: string,
    electionId: string,
    resultElection: ResultElection,
  ) =>
    fetchData<ResultElection>(RESULT_ELECTION_URL(databaseId, electionId), {
      method: "POST",
      body: JSON.stringify(resultElection),
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
      "Content-type": "application/json",
    },
  });

  // validate response
  if (!res.ok) {
    console.warn(`${res.status}: ${res.statusText}`);
    return;
  }

  return await res.json();
}

export interface GetAvaiableElectionsResponse {
  next_cursor?: string | null;
  results?: AvaiableElections[];
  message: string;
}

interface AvaiableElections {
  electionId: string;
  electionName: string;
}

export interface GetElectionPageResponse {
  results: PartyData[];
}

export interface CreateElectionResultResponse {
  message: string;
  id?: string;
}

export interface PartyData {
  id: string;
  code: string;
  name: string;
  slug: string;
  members: PartyMembers;
}

interface PartyMembers {
  candidate: Candidate;
  viceCandidate: Candidate;
}

interface Candidate {
  name: string;
  image: string;
}

export interface CreateResultPage {
  databaseId: string;
  electionName: string;
  electionId: string;
  winnerParty: Party;
  looserParty: Party;
}

interface Party {
  name: string;
  members: string[];
  votes: string;
}

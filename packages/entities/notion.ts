export interface GetAvailableElectionsResponse {
  next_cursor?: string | null;
  results?: AvailableElections[];
  message: string;
}

export interface GetElectionsPageResponse {
  results: Party[];
}

export interface GetElectionPageResponse {
  results: PartyData[];
}

interface AvailableElections {
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

export interface Party extends PartyData, PartyMembers {
  votes: number;
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
  winnerParty: PartySummary;
  looserParty: PartySummary;
}

interface PartySummary {
  name: string;
  members: string[];
  votes: string;
}

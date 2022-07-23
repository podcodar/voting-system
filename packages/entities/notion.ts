export interface GetAvaiableElectionsResponse {
  next_cursor?: string | null;
  results?: AvaiableElections[];
  message: string;
}

export interface GetElectionsPageResponse {
  results: Party[];
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

export interface Party extends PartyData, PartyMembers {
  votes: number;
}
export interface PartyData {
  id: string;
  code: number;
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

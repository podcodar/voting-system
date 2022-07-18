export interface GetAvaiableElectionsResponse {
  next_cursor?: string | null;
  results?: AvaiableElections[];
  message: string;
}

export interface Party {
  id: string;
  code: number;
  name: string;
  slug: string;
  votes: number;
  members: {
    candidate: {
      name: string;
      image: string;
    };
    viceCandidate: {
      name: string;
      image: string;
    };
  };
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

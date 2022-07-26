import {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import { ChildrenProps } from '@packages/utils/react';
import {
  GetAvailableElectionsResponse,
  Party,
} from '@packages/entities/notion';

import { electionsApi } from '../repository/api';

import { useConfigStates } from './config-context';

interface IVotingCtx {
  parties: Party[];
  availableElections: GetAvailableElectionsResponse;
  incrementVote: () => void;
  loadParties: (pageId: string) => void;
}
const defaultInitialState = {
  parties: [],
  availableElections: { message: '' },
  incrementVote: () => {},
  loadParties: () => {},
};

const VotingCtx = createContext<IVotingCtx>(defaultInitialState);

function VotingCtxProvider({ children }: ChildrenProps) {
  const { electionDatabaseId } = useConfigStates();
  const [availableElections, setAvailableElections] =
    useState<GetAvailableElectionsResponse>(
      defaultInitialState.availableElections,
    );
  const [partyList, setPartyList] = useState<Party[]>(
    defaultInitialState.parties,
  );

  const loadParties = useCallback(async (pageId: string) => {
    // TODO validate id
    const res = await electionsApi.getElectionPage(pageId);
    if (res) {
      setPartyList(res.results);
    }
  }, []);

  const incrementVote = useCallback(
    () => (partyCode: number) => {
      const updatedList = partyList.map((party) => {
        if (party.code !== partyCode) return party;

        return {
          ...party,
          votes: party.votes++,
        };
      });

      setPartyList(updatedList);
    },
    [partyList],
  );

  useEffect(() => {
    async function getData() {
      const res = await electionsApi.getAvaiableElections(electionDatabaseId);
      if (res) setAvailableElections(res);
    }
    getData();
  }, [electionDatabaseId]);

  const votingData = useMemo(() => {
    return {
      parties: partyList,
      availableElections: availableElections,
      incrementVote: incrementVote,
      loadParties: loadParties,
    };
  }, [partyList, incrementVote, availableElections, loadParties]);

  return <VotingCtx.Provider value={votingData}>{children}</VotingCtx.Provider>;
}

export function useVotingContext() {
  return useContext(VotingCtx);
}

export default VotingCtxProvider;

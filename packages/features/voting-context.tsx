import {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import { ChildrenProps } from '@packages/utils/react';
import { GetAvaiableElectionsResponse, Party } from '@packages/entities/notion';

import { electionsApi } from '../repository/api';

import { useConfigStates } from './config-context';

interface IVotingCtx {
  parties: Party[];
  incrementVote: () => void;
  availableElections: GetAvaiableElectionsResponse;
}
const defaultInitialState = {
  parties: [],
  incrementVote: () => {},
  availableElections: { message: '' },
};

const VotingCtx = createContext<IVotingCtx>(defaultInitialState);

function VotingCtxProvider({ children }: ChildrenProps) {
  const { electionDatabaseId } = useConfigStates();
  const [availableElections, setAvailableElections] =
    useState<GetAvaiableElectionsResponse>(
      defaultInitialState.availableElections,
    );
  const [partyList, setPartyList] = useState<Party[]>(
    defaultInitialState.parties,
  );

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
      incrementVote: incrementVote,
      availableElections: availableElections,
    };
  }, [partyList, incrementVote, availableElections]);

  return <VotingCtx.Provider value={votingData}>{children}</VotingCtx.Provider>;
}

export function useVotingContext() {
  return useContext(VotingCtx);
}

export default VotingCtxProvider;

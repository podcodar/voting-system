import {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from 'react';

import { ChildrenProps } from '@packages/utils/react';
import { Party } from '@packages/entities/notion';

interface IVotingCtx {
  parties: Party[];
  incrementVote: () => void;
}
const defaultInitialState = {
  parties: [],
  incrementVote: () => {},
};

const VotingCtx = createContext<IVotingCtx>(defaultInitialState);

function VotingCtxProvider({ children }: ChildrenProps) {
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

  const votingData = useMemo(() => {
    return {
      parties: partyList,
      incrementVote: incrementVote,
    };
  }, [partyList, incrementVote]);

  return <VotingCtx.Provider value={votingData}>{children}</VotingCtx.Provider>;
}

export function useVotingContext() {
  return useContext(VotingCtx);
}

export default VotingCtxProvider;

import {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import { ChildrenProps } from '@packages/utils/react';
import { Party } from '@packages/entities/notion';
import { electionsApi } from '@packages/repository/api';

interface IVotingCtx {
  parties: Party[];
  incrementVote: () => void;
}
const defaultInitialState = {
  parties: [
    {
      id: '2ab435ef-4287-4477-937a-bf7518fa061b',
      code: 13,
      name: 'Partido dos trabalhadores',
      slug: 'PT',
      votes: 0,
      members: {
        candidate: {
          name: 'Joezinho da força',
          image:
            'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8572bfd8-459d-4e20-8222-7ce49e67327f/joel.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220718%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220718T215045Z&X-Amz-Expires=3600&X-Amz-Signature=f06e85623442c201d923d735778ba892cff7433f095fc5eafebc7c40e0a22748&X-Amz-SignedHeaders=host&x-id=GetObject',
        },
        viceCandidate: {
          name: 'Pedro Gatinho',
          image:
            'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/540501c6-d882-4adf-ac65-aa799e68c449/eu.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220718%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220718T215045Z&X-Amz-Expires=3600&X-Amz-Signature=7f3729ab344b4a28e1b68fd3529a6d9b47ff33383c6f12a057a07607ce9159d8&X-Amz-SignedHeaders=host&x-id=GetObject',
        },
      },
    },
  ],
  incrementVote: () => {},
};

const VotingCtx = createContext<IVotingCtx>(defaultInitialState);

function VotingCtxProvider({ children }: ChildrenProps) {
  const [partyList, setPartyList] = useState<Party[]>(
    defaultInitialState.parties,
  );

  useEffect(() => {
    async function getData() {
      const test = await electionsApi.getElectionPage(
        '71b6faee-915f-4442-adbb-6e18f2f86e1d',
      );
      if (test?.results) {
        setPartyList(test.results);
      }
    }

    getData();
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

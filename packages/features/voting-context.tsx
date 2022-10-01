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
import { electionsApi } from '@packages/repository/api';

interface IVotingCtx {
  parties: Party[];
  availableElections: GetAvailableElectionsResponse;
  voteInput: string;
  selectedParty: Party | undefined;
  isVoting: boolean;
  endMessage: string;
  incrementVote: () => void;
  blankHandler: () => void;
  clearHandler: () => void;
  confirmHandler: () => void;
  loadParties: (pageId: string) => void;
  loadAvailableElections: (databaseID: string) => void;
  updateVoteInput: (input: string) => void;
}

const defaultInitialState = {
  parties: [],
  availableElections: { message: '' },
  voteInput: '',
  selectedParty: undefined,
  isVoting: true,
  endMessage: '',
  setIsVoting: () => {},
  incrementVote: () => {},
  blankHandler: () => {},
  clearHandler: () => {},
  confirmHandler: () => {},
  loadParties: () => {},
  loadAvailableElections: () => {},
  updateVoteInput: () => {},
};

const VotingCtx = createContext<IVotingCtx>(defaultInitialState);

function VotingCtxProvider({ children }: ChildrenProps) {
  // TODO separate voting context from election context

  // Election related
  const [availableElections, setAvailableElections] =
    useState<GetAvailableElectionsResponse>(
      defaultInitialState.availableElections,
    );
  const [partyList, setPartyList] = useState<Party[]>(
    defaultInitialState.parties,
  );

  const loadParties = useCallback(async (pageId: string) => {
    const res = await electionsApi.getElectionPage(pageId);
    if (res) {
      setPartyList(res.results);
    }
  }, []);

  const loadAvailableElections = useCallback((databaseID: string) => {
    if (databaseID.length) {
      getData();
    }
    async function getData() {
      const res = await electionsApi.getAvailableElections(databaseID);
      if (res) setAvailableElections(res);
    }
  }, []);

  const incrementVote = useCallback(
    () => (partyCode: number) => {
      const updatedList = partyList.map((party) => {
        if (party.code !== partyCode.toString()) return party;

        return {
          ...party,
          votes: party.votes++,
        };
      });

      setPartyList(updatedList);
    },
    [partyList],
  );
  // end of Election related

  // Voting related
  const [voteInput, setVoteInput] = useState('');
  const [isVoting, setIsVoting] = useState(true);
  const [selectedParty, setSelectedParty] = useState<Party>();
  const [endMessage, setEndMessage] = useState('FIM');
  const secretCode = '12345';

  useEffect(() => {
    if (voteInput) {
      const result = partyList.find((party) => {
        return party.code === voteInput;
      });

      if (result) {
        setSelectedParty(result);
      }
    }
  }, [partyList, selectedParty, voteInput]);

  const updateVoteInput = useCallback(
    (input: string) => {
      if (voteInput.length > 5) return;

      if (input.charCodeAt(0) >= 48 && input.charCodeAt(0) <= 57) {
        setVoteInput(voteInput + input);
      }
    },
    [voteInput],
  );

  // TODO 'are you sure' step
  const blankHandler = useCallback(() => {
    handleVote('Branco');
  }, []);

  const nullHandler = useCallback(() => {
    handleVote('Nulo');
  }, []);

  const confirmHandler = useCallback(() => {
    if (voteInput === secretCode) return handleVotingEnd();
    if (selectedParty && selectedParty.name)
      return handleVote(selectedParty.name);

    nullHandler();
  }, [voteInput, selectedParty, nullHandler]);

  const clearHandler = useCallback(() => {
    setVoteInput('');
  }, []);

  function handleVote(message: string) {
    // TODO update result
    setIsVoting(false);
    setEndMessage('Você Votou em ' + message);
    setVoteInput('');
    setTimeout(() => {
      setIsVoting(true);
    }, 5000);
  }

  function handleVotingEnd() {
    // TODO save result to db
    setEndMessage('Eleição Encerrada');
    setIsVoting(false);
  }

  // End of Voting related

  const votingData = useMemo(() => {
    return {
      parties: partyList,
      availableElections: availableElections,
      voteInput: voteInput,
      selectedParty: selectedParty,
      isVoting: isVoting,
      endMessage,
      handleVote: handleVote,
      setIsVoting: setIsVoting,
      blankHandler: blankHandler,
      confirmHandler: confirmHandler,
      clearHandler: clearHandler,
      updateVoteInput: updateVoteInput,
      incrementVote: incrementVote,
      loadParties: loadParties,
      loadAvailableElections: loadAvailableElections,
    };
  }, [
    partyList,
    availableElections,
    selectedParty,
    voteInput,
    isVoting,
    endMessage,
    setIsVoting,
    blankHandler,
    confirmHandler,
    clearHandler,
    updateVoteInput,
    incrementVote,
    loadParties,
    loadAvailableElections,
  ]);

  return <VotingCtx.Provider value={votingData}>{children}</VotingCtx.Provider>;
}

export function useVotingContext() {
  return useContext(VotingCtx);
}

export default VotingCtxProvider;

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
  AvailableElections,
  GetAvailableElectionsResponse,
  Party,
  PartySummary,
  ResultElection,
} from '@packages/entities/notion';
import { electionsApi } from '@packages/repository/api';
import {
  addVote,
  getConfiguration,
  getVotes,
} from '@packages/repository/indexedDb';
import { IVote } from '@packages/entities/indexedDb';

interface IVotingCtx {
  parties: Party[];
  availableElections: GetAvailableElectionsResponse;
  voteInput: string;
  selectedParty: Party | undefined;
  isVoting: boolean;
  endMessage: string;
  nullVote: boolean;
  isBlankSelected: boolean;
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
  nullVote: false,
  isBlankSelected: false,
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

  const loadParties = useCallback(async (electionId: string) => {
    setCurrentElectionId(electionId);
    const res = await electionsApi.getElectionPage(electionId);
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
  const [nullVote, setNullVote] = useState<boolean>(false);
  const [currentElectionId, setCurrentElectionId] = useState<string>('');
  const [isVoting, setIsVoting] = useState(true);
  const [selectedParty, setSelectedParty] = useState<Party>();
  const [endMessage, setEndMessage] = useState('FIM');
  const [isBlankSelected, setBlankConfirm] = useState(false);

  const secretCode = '12345';

  useEffect(() => {
    if (voteInput && voteInput.length == 2) {
      const result = partyList.find((party) => {
        return party.code === voteInput;
      });

      if (result) {
        setSelectedParty(result);
        setNullVote(false);
        return;
      }

      setNullVote(true);
      return;
    }
    setSelectedParty(undefined);
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

  const blankHandler = useCallback(() => {
    if (isBlankSelected) return;
    else if (voteInput.length === 0) {
      addVote('branco', currentElectionId);
      return setBlankConfirm(true);
    }
  }, [currentElectionId, isBlankSelected, voteInput.length]);

  const nullHandler = useCallback(() => {
    handleVote('Nulo');
    addVote('nulo', currentElectionId);
  }, [currentElectionId]);

  const confirmHandler = useCallback(() => {
    if (isBlankSelected) return handleVote('Branco');
    if (voteInput === secretCode) return handleVotingEnd();
    if (selectedParty && selectedParty.name) {
      addVote(selectedParty.code, currentElectionId);
      return handleVote(selectedParty.name);
    }
    if (voteInput.length >= 2) nullHandler();
  }, [
    isBlankSelected,
    voteInput,
    selectedParty,
    nullHandler,
    currentElectionId,
  ]);

  const clearHandler = useCallback(() => {
    setVoteInput('');
    setBlankConfirm(false);
    setNullVote(false);
  }, []);

  function handleVote(message: string) {
    // TODO update result
    setIsVoting(false);
    setEndMessage('Você Votou em ' + message);
    setVoteInput('');
    setBlankConfirm(false);
    setNullVote(false);
    setTimeout(() => {
      setIsVoting(true);
    }, 1000);
  }

  async function handleVotingEnd() {
    // TODO save result to db
    setEndMessage('Eleição Encerrada');
    setIsVoting(false);
    await generateResult();
  }

  interface ICountVotesElection {
    [key: string]: number;
  }

  async function CountVotes(votes: IVote[]) {
    const countVotes: ICountVotesElection = {};

    for (const vote of votes) {
      const currentResult = countVotes[vote.code];
      if (!currentResult) {
        countVotes[vote.code] = 1;
        continue;
      }

      countVotes[vote.code] = currentResult + 1;
    }

    return countVotes;
  }

  async function createObjectPostResult(
    orderResult: [string, number][],
    election: AvailableElections,
  ) {
    const winnerParty: PartySummary = {
      name: '',
      members: [],
      votes: '0',
    };

    const loserParty: PartySummary = {
      name: '',
      members: [],
      votes: '0',
    };

    let positionResult: number = 0;
    for (let index = 0; index < orderResult.length; index++) {
      if (
        orderResult[index][0] === 'nulo' ||
        orderResult[index][0] === 'branco'
      ) {
        continue;
      }

      const party: Party | undefined = partyList.find((party) => {
        return party.code === orderResult[index][0].toString();
      });

      if (!party) {
        return;
      }

      const members: Array<string> = [];

      members.push(party.members.candidate.name);
      members.push(party.members.viceCandidate.name);

      if (positionResult === 0) {
        winnerParty.name = party.name;
        winnerParty.members = members;
        winnerParty.votes = orderResult[index][1].toString();
      }

      if (positionResult === 1) {
        loserParty.name = party.name;
        loserParty.members = members;
        loserParty.votes = orderResult[index][1].toString();
      }
      positionResult = positionResult + 1;
    }

    const resultElection: ResultElection = {
      electionName: election?.electionName,
      winnerParty: winnerParty,
      looserParty: loserParty,
    };

    return resultElection;
  }

  async function generateResult() {
    const votes = await getVotes(currentElectionId);

    const countVotes: ICountVotesElection = await CountVotes(votes);

    const election: AvailableElections | undefined =
      availableElections.results?.find((election) => {
        return election.electionId === currentElectionId;
      });

    if (!election) {
      return;
    }

    const orderResult = Object.entries(countVotes).sort((a, b) => b[1] - a[1]);

    const resultElection: ResultElection | undefined =
      await createObjectPostResult(orderResult, election);

    if (!resultElection) {
      return;
    }

    const configDatabase = await getConfiguration();

    electionsApi.postResultElection(
      configDatabase.resultsDatabaseId,
      configDatabase.electionDatabaseId,
      resultElection,
    );
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
      nullVote,
      isBlankSelected,
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
    nullVote,
    isBlankSelected,
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

import {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import Router from 'next/router';

import { PlayFim } from '@packages/components/AudioTags';
import { ChildrenProps } from '@packages/utils/react';
import {
  AvailableElections,
  GetAvailableElectionsResponse,
  Party,
  ResultElectionData,
  ResultToNotion,
} from '@packages/entities/notion';
import { electionsApi } from '@packages/repository/api';
import {
  addVote,
  getConfiguration,
  getVotes,
} from '@packages/repository/indexedDb';

interface IVotingCtx {
  parties: Party[];
  availableElections: GetAvailableElectionsResponse;
  voteInput: string;
  selectedParty: Party | undefined;
  isVoting: boolean;
  endMessage: string;
  nullVote: boolean;
  isBlankSelected: boolean;
  dataPageResult: ResultElectionData[];
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
  dataPageResult: [],
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
  const [dataPageResult, setDataPageResult] = useState<ResultElectionData[]>(
    defaultInitialState.dataPageResult,
  );
  const secretCode = '12345';

  useEffect(() => {
    if (voteInput && voteInput.length >= 2) {
      const result = partyList.find((party) => {
        return party.code === voteInput.slice(0, 2);
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

  const mapToNotion = useCallback(
    (voteCounts: { [key: string]: number }): ResultToNotion => {
      const [[winnerCode, winnerVotes], [loserCode, loserVotes]]: any =
        Object.entries(voteCounts).sort((a: any, b: any) => b[1] - a[1]);

      const [{ members: winnerMembers, name: winnerName }] = partyList.filter(
        (party) => party.code === winnerCode,
      );
      const [{ members: loserMembers, name: loserName }] = partyList.filter(
        (party) => party.code === loserCode,
      );

      const results: ResultToNotion = {
        winner: {
          members: winnerMembers,
          name: winnerName,
          votes: winnerVotes,
        },
        loser: {
          members: loserMembers,
          name: loserName,
          votes: loserVotes,
        },
      };

      return results;
    },
    [partyList],
  );

  const postResult = useCallback(async () => {
    const votes = await getVotes(currentElectionId);
    const configDatabase = await getConfiguration();

    const election: AvailableElections | undefined =
      availableElections.results?.find((election) => {
        return election.electionId === currentElectionId;
      });

    if (!election) {
      return '';
    }

    const voteCounts: { [key: string]: number } = countingVotes(votes);

    const resultMapToNotion: ResultToNotion = mapToNotion(voteCounts);

    const response = await electionsApi.postResultElection(
      configDatabase.resultsDatabaseId,
      currentElectionId,
      {
        electionName: election.electionName,
        winnerParty: {
          name: resultMapToNotion.winner.name,
          members: [
            resultMapToNotion.winner.members.candidate.name,
            resultMapToNotion.winner.members.viceCandidate.name,
          ],
          votes: resultMapToNotion.winner.votes as string,
        },
        looserParty: {
          name: resultMapToNotion.loser.name,
          members: [
            resultMapToNotion.loser.members.candidate.name,
            resultMapToNotion.loser.members.viceCandidate.name,
          ],
          votes: resultMapToNotion.loser.votes as string,
        },
      },
    );

    if (response?.id !== undefined) {
      return response.id;
    } else {
      return '';
    }
  }, [availableElections.results, currentElectionId, mapToNotion]);

  const handleVotingEnd = useCallback(async () => {
    setEndMessage('Eleição Encerrada');
    setIsVoting(false);
    const pageIdResult: string = await postResult();
    const resultElectionPage = await electionsApi.getResultElection(
      pageIdResult,
      currentElectionId,
    );
    if (resultElectionPage === undefined) return;
    setDataPageResult(resultElectionPage?.results);
    Router.push(`/result`);
  }, [currentElectionId, postResult]);

  const confirmHandler = useCallback(async () => {
    if (isBlankSelected) return handleVote('Branco');
    if (voteInput === secretCode) return await handleVotingEnd();
    if (selectedParty && selectedParty.name) {
      addVote(selectedParty.code, currentElectionId);
      return handleVote(selectedParty.name);
    }
    if (voteInput.length >= 2) nullHandler();
  }, [
    isBlankSelected,
    voteInput,
    handleVotingEnd,
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
    PlayFim();
    setIsVoting(false);
    setEndMessage('Você Votou em ' + message);
    setVoteInput('');
    setBlankConfirm(false);
    setNullVote(false);
    setTimeout(() => {
      setIsVoting(true);
    }, 1000);
  }

  function countingVotes(votes: any) {
    const votedSet = new Set();
    const voteCounts: { [key: string]: number } = {};

    votes.forEach((vote: any) => {
      const code = vote.code;
      if (!isNaN(parseFloat(code))) {
        if (votedSet.has(code)) {
          voteCounts[code] += 1;
        } else {
          votedSet.add(code);
          voteCounts[code] = 1;
        }
      }
    });

    return voteCounts;
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
      dataPageResult,
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
    dataPageResult,
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

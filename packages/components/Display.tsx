import { Flex } from '@chakra-ui/react';

import { useVotingContext } from '@packages/features/voting-context';

import DigitBox from './DigitBox';
import PartyInfo from './PartyInfo';
import CandidatePhotos from './CandidatePhotos';

//TODO: Move to centralized theme
const votingScreenColor = '#D9D9D9';

export default function Display() {
  const { selectedParty } = useVotingContext();

  const candidate = selectedParty?.members.candidate;
  const vice = selectedParty?.members.viceCandidate;
  const partyName = selectedParty?.name;

  return (
    <Flex bg={votingScreenColor} flexDir="column" justify="space-between">
      <Flex
        flexDir="row"
        flexGrow="1"
        justify="space-between"
        alignItems="center"
      >
        <DigitBox />
        <CandidatePhotos
          candidatePhoto={candidate?.image}
          vicePhoto={vice?.image}
        />
      </Flex>
      <Flex>
        <PartyInfo
          candidate={candidate?.name}
          vice={vice?.name}
          party={partyName}
        />
      </Flex>
    </Flex>
  );
}

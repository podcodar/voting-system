import { Flex, Grid } from '@chakra-ui/react';

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
    <Grid
      bg={votingScreenColor}
      templateColumns="1fr 1fr"
      h="80%"
      alignSelf="center"
    >
      <Flex h="100%" justifyContent="end" flexDir="column">
        <DigitBox />
        <PartyInfo
          candidate={candidate?.name}
          vice={vice?.name}
          party={partyName}
        />
      </Flex>
      <Flex h="100%" justify="center" align="flex-end" flexDir="column">
        <CandidatePhotos
          candidatePhoto={candidate?.image}
          vicePhoto={vice?.image}
        />
      </Flex>
    </Grid>
  );
}

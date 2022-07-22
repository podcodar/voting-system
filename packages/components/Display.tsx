import { useEffect } from 'react';
import { Flex, Grid } from '@chakra-ui/react';

import { useVotingContext } from '@packages/features/voting-context';

import DigitBox from './DigitBox';
import PartyInfo from './PartyInfo';
import CandidatePhotos from './CadidatePhotos';

// TODO(Mamao): Move to centralized theme

export default function Display() {
  const { parties } = useVotingContext();

  useEffect(() => {
    console.log(JSON.stringify(parties));
  }, [parties]);

  return (
    <Grid templateColumns="1fr 1fr" h="80%" alignSelf="center">
      <Flex h="100%" justifyContent="end" flexDir="column">
        <DigitBox />
        <PartyInfo />
      </Flex>
      <Flex h="100%" justify="center" align="flex-end" flexDir="column">
        <CandidatePhotos />
      </Flex>
    </Grid>
  );
}

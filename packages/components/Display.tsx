import { useEffect } from 'react';
import { Flex, Grid } from '@chakra-ui/react';
import DigitBox from './DigitBox';

import { useVotingContext } from '@packages/features/voting-context';

import PartyInfo from './PartyInfo';

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
      <Flex bg="#FEFCBF" h="100%" justifyContent="center" alignItems="center">
        Contender box
      </Flex>
    </Grid>
  );
}

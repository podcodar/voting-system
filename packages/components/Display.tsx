import { useEffect } from 'react';
import { Flex, Grid } from '@chakra-ui/react';

import { useVotingContext } from '@packages/features/voting-context';

import PartyInfo from './PartyInfo';

export default function Display() {
  const { partys } = useVotingContext();

  useEffect(() => {
    console.log(JSON.stringify(partys));
  }, [partys]);

  return (
    <Grid templateColumns="1fr 1fr" h="80%" alignSelf="center">
      <Flex bg="#FED7D7" h="100%" justifyContent="center" alignItems="end">
        <PartyInfo />
      </Flex>
      <Flex bg="#FEFCBF" h="100%" justifyContent="center" alignItems="center">
        Contender box
      </Flex>
    </Grid>
  );
}

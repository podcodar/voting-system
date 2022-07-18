import { Flex, Grid } from '@chakra-ui/react';

import PartyInfo from './PartyInfo';

export default function Display() {
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

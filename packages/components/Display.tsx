import { Flex, Grid } from '@chakra-ui/react';
import DigitBox from './DigitBox';

import PartyInfo from './PartyInfo';

export default function Display() {
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

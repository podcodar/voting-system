import { useState } from 'react';
import { Box, Grid, Flex, Heading } from '@chakra-ui/react';

import Display from '@packages/components/Display';

import type { NextPage } from 'next';

const VotingPage: NextPage = () => {
  const [isVoting] = useState(true);

  // function handleVote() {
  //   setIsVoting(false);
  //   setTimeout(() => {
  //     setIsVoting(true);
  //   }, 5000);
  // }

  return (
    <Grid templateColumns="2fr 1fr" gap="3" h="100vh" p="10">
      {isVoting ? <Display /> : <VotingEndBox />}
      <Box bg="blue" h="100%" boxShadow="dark-lg" />
    </Grid>
  );
};

function VotingEndBox() {
  return (
    <Flex w="100%" h="100%" justify="center" align="center">
      <Heading>FIM</Heading>
    </Flex>
  );
}

export default VotingPage;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Heading, Center, Flex } from '@chakra-ui/react';

import Display from '@packages/components/Display';
import VotingInstructions from '@packages/components/VotingInstruction';
import InputPanel from '@packages/components/InputPanel/InputPanel';
import { useVotingContext } from '@packages/features/voting-context';

import type { NextPage } from 'next';

const VotingPage: NextPage = () => {
  const router = useRouter();
  const { loadParties } = useVotingContext();
  const [isVoting] = useState(true);

  // function handleVote() {
  //   setIsVoting(false);
  //   setTimeout(() => {
  //     setIsVoting(true);
  //   }, 5000);
  // }

  useEffect(() => {
    loadParties(router.query.electionId as string);
  }, [loadParties, router]);

  return (
    <Grid templateColumns="2fr 1fr" gap="3" h="100vh" p="10">
      {isVoting ? <Display /> : <VotingEndBox />}
      <Flex
        h="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        backgroundColor="#D9D9D9"
      >
        <VotingInstructions />
        <InputPanel />
      </Flex>
    </Grid>
  );
};

function VotingEndBox() {
  return (
    <Center w="100%" h="100%">
      <Heading>FIM</Heading>
    </Center>
  );
}

export default VotingPage;

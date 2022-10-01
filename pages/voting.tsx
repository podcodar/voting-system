import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Heading, Center, Flex } from '@chakra-ui/react';

import Display from '@packages/components/Display';
import InputPanel from '@packages/components/InputPanel/InputPanel';
import { useVotingContext } from '@packages/features/voting-context';

import type { NextPage } from 'next';

const VotingPage: NextPage = () => {
  const router = useRouter();
  const { loadParties, isVoting } = useVotingContext();

  useEffect(() => {
    const electionId = router.query.electionId;
    if (electionId) {
      loadParties(electionId as string);
    }
  }, [loadParties, router]);

  return (
    <Center>
      <Grid
        templateColumns="2fr 1fr"
        gap="3"
        h="100vh"
        p="10"
        alignItems="center"
        maxW="1980px"
      >
        {isVoting ? <Display /> : <VotingEndBox />}
        <Flex
          h="82%"
          direction="column"
          justifyContent="center"
          backgroundColor="#D9D9D9"
          borderRadius=".625rem"
        >
          <InputPanel />
        </Flex>
      </Grid>
    </Center>
  );
};

function VotingEndBox() {
  const { endMessage } = useVotingContext();
  return (
    <Center w="100%" h="100%">
      <Heading>{endMessage}</Heading>
    </Center>
  );
}

export default VotingPage;

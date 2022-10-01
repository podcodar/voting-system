import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Center } from '@chakra-ui/react';

import Display from '@packages/components/Display';
import InputPanel from '@packages/components/InputPanel/InputPanel';
import { useVotingContext } from '@packages/features/voting-context';

import type { NextPage } from 'next';

const VotingPage: NextPage = () => {
  const router = useRouter();
  const { loadParties } = useVotingContext();

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
        maxH="900px"
      >
        <Display />
        <InputPanel />
      </Grid>
    </Center>
  );
};

export default VotingPage;

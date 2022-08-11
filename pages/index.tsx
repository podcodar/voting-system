import { FormEvent, useEffect, useState } from 'react';
import { Heading, Box, Flex, Select, Button } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useVotingContext } from '@packages/features/voting-context';
import NavBar from '@packages/components/NavBar';
import { getConfiguration } from '@packages/repository/indexedDb';
import { useConfigActions } from '@packages/features/config-context';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  const router = useRouter();
  const { availableElections, loadAvailableElections } = useVotingContext();
  const { setFormState } = useConfigActions();
  const [selectedElection, setSelectedElection] = useState('');
  function startElection() {
    if (selectedElection) router.push(`/voting?electionId=${selectedElection}`);
  }

  useEffect(() => {
    async function loadInitialState() {
      const persistedInitialState = await getConfiguration();
      const initialState = persistedInitialState;
      setFormState(initialState);
      loadAvailableElections(initialState.electionDatabaseId);
    }

    loadInitialState();
  }, [loadAvailableElections, setFormState]);

  return (
    <>
      <NavBar />
      <Flex h="80vh" w="100vw" alignItems="center" justifyContent="center">
        <Box>
          <Head>
            <title>Eleições 2022</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
            <Heading as="h1" size="2xl">
              Selecione uma votação{' '}
            </Heading>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              py="30px"
            >
              <Select
                placeholder="Escolha sua Votação"
                onChange={(e: FormEvent<HTMLSelectElement>) =>
                  setSelectedElection(e.currentTarget.value)
                }
              >
                {availableElections?.results?.map((election) => (
                  <option
                    key={election.electionName}
                    value={election.electionId}
                  >
                    {election.electionName}
                  </option>
                ))}
              </Select>
              <Button
                colorScheme="blue"
                marginLeft="10px"
                onClick={startElection}
              >
                Iniciar Votação
              </Button>
            </Box>
          </main>
        </Box>
      </Flex>
    </>
  );
};

export default Home;

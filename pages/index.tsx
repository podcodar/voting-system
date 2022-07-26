import { Heading, Box, Flex, Select, Button } from '@chakra-ui/react';
import Head from 'next/head';

import { useVotingContext } from '@packages/features/voting-context';
import NavBar from '@packages/components/NavBar';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { availableElections } = useVotingContext();
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
              <Select>
                {availableElections?.results?.map((election) => (
                  <option key={election.electionName}>
                    {election.electionName}
                  </option>
                ))}
              </Select>
              <Button colorScheme="blue" marginLeft="10px">
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

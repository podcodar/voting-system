import { Heading, Box, Flex, Select, Button } from '@chakra-ui/react';
import Head from 'next/head';

import NavBar from '@packages/components/NavBar';

import type { NextPage } from 'next';

const mockElections = [
  {
    electionId: '47b8e344-0243-435d-822b-4192f691f5a7',
    electionName: 'Dimensão colégio - 06',
    keyPosition: 'Chefe de turma',
  },
  {
    electionId: '58ebc9cd-5a4d-4902-876c-95008a537657',
    electionName: 'Dimensão colégio - 07',
    keyPosition: 'Chefe de turma',
  },
];

const Home: NextPage = () => {
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
                {mockElections.map((voting) => (
                  <option key={voting.electionName}>
                    {voting.electionName}
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

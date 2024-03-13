'use client';

import { Flex, Text } from '@chakra-ui/react';

import ResultDisplay from 'src/packages/components/ResultDisplay';

import type { NextPage } from 'next';

const ResultPage: NextPage = () => {
  return (
    <Flex
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Text
        fontSize="30px"
        textAlign="center"
        py="3rem"
        color="#1E90FF"
        textShadow="1px 1px #ADD8E6"
      >
        {' '}
        Resultado da Votação
      </Text>
      <ResultDisplay />
    </Flex>
  );
};

export default ResultPage;

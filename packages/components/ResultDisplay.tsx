import { Center, Divider, Flex, Text } from '@chakra-ui/react';

import ResultCard from '@packages/components/ResultCard';
import { useVotingContext } from '@packages/features/voting-context';

export default function ResultDisplay() {
  const { dataPageResult } = useVotingContext();

  return (
    <Flex
      w="70wh"
      alignSelf="center"
      justifyContent="center"
      direction="column"
      gap="2rem"
    >
      {dataPageResult.map((party, index) => (
        <Flex boxShadow="base" alignItems="center" key={party.candidate}>
          <Center padding="2rem">
            <Text color="#A2B5CD" textShadow="2px 1px #CAE1FF" fontSize="25px">
              {index + 1}
            </Text>
          </Center>
          <Divider orientation="vertical" p="0 1rem" />
          <Center paddingRight="2rem">
            <ResultCard
              candidate={party.candidate}
              vice={party.vice}
              party={party.partido}
              percentagem={party.porcentagem}
              votos={party.votos}
            />
          </Center>
        </Flex>
      ))}
    </Flex>
  );
}

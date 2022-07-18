import { Flex, Box, Avatar, Text } from '@chakra-ui/react';

interface Electionesult {
  candidate: string;
  vice: string;
  party: string;
  percentagem: string;
  votos: string;
}

function ResultCard({
  candidate,
  vice,
  party,
  percentagem,
  votos,
}: Electionesult) {
  return (
    <Flex flexDirection="row" w="60vw">
      <Box w="40vw">
        <Flex>
          <Box>
            <Avatar src="" />
          </Box>
          <Box px="0.4rem">
            <Text fontWeight="bold">Candidato: {candidate}</Text>
            <Text fontSize="sm">Vice: {vice}</Text>
          </Box>
        </Flex>
        <Box py=".5rem">
          <Text>
            <b>Partido: </b>
            {party}
          </Text>
        </Box>
      </Box>
      <Flex justifyContent="center" flexDirection="column">
        <Text fontSize="15px">
          {' '}
          Percentagem dos votos válidos: <b>{percentagem}</b>
        </Text>
        <Text fontSize="15px">
          {' '}
          Número total de votos: <b>{votos}</b>
        </Text>
      </Flex>
    </Flex>
  );
}

export default ResultCard;

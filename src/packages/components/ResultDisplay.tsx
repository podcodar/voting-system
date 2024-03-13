import { Center, Divider, Flex, Text } from '@chakra-ui/react';

import ResultCard from 'src/packages/components/ResultCard';

const positions = [
  {
    candidate: 'Daniel Menezes',
    vice: 'Joel Morais',
    partido: 'PCdoB',
    porcentagem: '55%',
    votos: '550',
  },
  {
    candidate: 'Gabriel Amarante',
    vice: 'Érica Poline',
    partido: 'PT',
    porcentagem: '10%',
    votos: '100',
  },
  {
    candidate: 'Lucas Moreira',
    vice: 'Raquel',
    partido: 'Psol',
    porcentagem: '35%',
    votos: '350',
  },
];
export default function ResultDisplay() {
  return (
    <Flex
      w="70wh"
      alignSelf="center"
      justifyContent="center"
      direction="column"
      gap="2rem"
    >
      {positions.map((party, index) => (
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

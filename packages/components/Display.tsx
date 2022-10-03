import { Center, Flex, Text } from '@chakra-ui/react';

import { useVotingContext } from '@packages/features/voting-context';

import DigitBox from './DigitBox';
import PartyInfo from './PartyInfo';
import CandidatePhotos from './CandidatePhotos';

//TODO: Move to centralized theme
const votingScreenColor = '#D9D9D9';

export default function Display() {
  const { selectedParty, nullVote, isBlackSelected } = useVotingContext();

  const candidate = selectedParty?.members.candidate;
  const vice = selectedParty?.members.viceCandidate;
  const partyName = selectedParty?.name;

  return (
    <Flex bg={votingScreenColor} flexDir="column" justify="space-between">
      <Flex
        flexDir="row"
        flexGrow="1"
        justify="space-between"
        alignItems="center"
      >
        <DigitBox />
        <CandidatePhotos
          candidatePhoto={candidate?.image}
          vicePhoto={vice?.image}
        />
      </Flex>
      <Flex flexDir="column" gap="1rem">
        {nullVote || isBlackSelected ? (
          <NullBlankBox />
        ) : (
          <PartyInfo
            candidate={candidate?.name}
            vice={vice?.name}
            party={partyName}
          />
        )}
        <VoteInstructions />
      </Flex>
    </Flex>
  );
}

function VoteInstructions() {
  return (
    <Flex
      sx={{
        fontSize: '26px',
        fontFamily: 'inter',
        width: '45ch',
        p: '1rem 1rem 10% 1rem',
        fontWeight: '700',
        gap: '0.3rem',
        flexDir: 'column',
      }}
    >
      <Text ml="">Aperte a tecla:</Text>
      <Text ml="1.5rem">
        <span style={{ color: '#38A169' }}>VERDE</span> para confirmar seu voto
      </Text>
      <Text ml="2rem">
        <span style={{ color: '#E53E3E' }}>VERMELHO</span> para reiniciar seu
        voto
      </Text>
    </Flex>
  );
}

function NullBlankBox() {
  const { isBlackSelected } = useVotingContext();
  return (
    <Center>
      <Text
        sx={{
          fontSize: '80px',
          fontFamily: 'inter',
          fontWeight: '700',
        }}
      >
        {`VOTO ${!isBlackSelected ? 'NULO' : 'EM BRANCO'}`}
      </Text>
    </Center>
  );
}

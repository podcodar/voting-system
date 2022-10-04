import { Center, Flex, Text } from '@chakra-ui/react';

import { useVotingContext } from '@packages/features/voting-context';

import DigitBox from './DigitBox';
import PartyInfo from './PartyInfo';
import CandidatePhotos from './CandidatePhotos';

export default function VotingDisplay() {
  const { selectedParty, nullVote, isBlankSelected } = useVotingContext();

  const candidate = selectedParty?.members.candidate;
  const vice = selectedParty?.members.viceCandidate;
  const partyName = selectedParty?.name;

  return (
    <>
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
        {nullVote || isBlankSelected ? (
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
    </>
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
  const { isBlankSelected } = useVotingContext();
  return (
    <Center>
      <Text
        sx={{
          fontSize: '80px',
          fontFamily: 'inter',
          fontWeight: '700',
        }}
      >
        {`VOTO ${!isBlankSelected ? 'NULO' : 'EM BRANCO'}`}
      </Text>
    </Center>
  );
}

import { useEffect } from 'react';
import { Flex, Grid } from '@chakra-ui/react';

import { useVotingContext } from '@packages/features/voting-context';

import DigitBox from './DigitBox';
import PartyInfo from './PartyInfo';
import CandidatePhotos from './CadidatePhotos';

// TODO(Mamao): Move to centralized theme

export default function Display() {
  const { parties } = useVotingContext();

  useEffect(() => {
    console.log(JSON.stringify(parties));
  }, [parties]);

  return (
    <Grid templateColumns="1fr 1fr" h="80%" alignSelf="center">
      <Flex h="100%" justifyContent="end" flexDir="column">
        <DigitBox />
        <PartyInfo />
      </Flex>
      <Flex
        bg="#FEFCBF"
        h="100%"
        justifyContent="center"
        alignItems="flex-end"
        flexDirection="column"
      >
        <CandidatePhotos
          source={
            'https://static.wixstatic.com/media/0bd8b5_779385fe12ff4155947b97f75533ffb9~mv2.jpg/v1/fill/w_458,h_458,al_c,lg_1,q_80,enc_auto/BONECO%20PARA%20PERFIL.jpg'
          }
        />
      </Flex>
    </Grid>
  );
}

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
      <Flex h="100%" justify="center" align="flex-end" flexDir="column">
        <CandidatePhotos
          candidatePhoto={
            'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8572bfd8-459d-4e20-8222-7ce49e67327f/joel.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220720%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220720T224244Z&X-Amz-Expires=86400&X-Amz-Signature=3290eab7bb09f8b3e65ef1b8155f078a90634b4697d7e961b594a225e0028840&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22joel.jpg%22&x-id=GetObject'
          }
          vicePhoto={
            'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8572bfd8-459d-4e20-8222-7ce49e67327f/joel.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220720%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220720T224244Z&X-Amz-Expires=86400&X-Amz-Signature=3290eab7bb09f8b3e65ef1b8155f078a90634b4697d7e961b594a225e0028840&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22joel.jpg%22&x-id=GetObject'
          }
        />
      </Flex>
    </Grid>
  );
}

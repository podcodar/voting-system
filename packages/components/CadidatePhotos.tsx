import { Avatar, Flex, Spacer } from '@chakra-ui/react';

interface CadidateCardProps {
  candidatePhoto?: string;
  vicePhoto?: string;
}

export default function CandidatePhotos({
  candidatePhoto,
  vicePhoto,
}: CadidateCardProps) {
  return (
    <Flex padding="1rem" flexDirection="column">
      <Avatar boxSize="10rem" src={candidatePhoto} />
      <Spacer height="2rem" />
      <Flex justifyContent="center">
        <Avatar boxSize="8rem" src={vicePhoto} marginTop="1rem" />
      </Flex>
    </Flex>
  );
}

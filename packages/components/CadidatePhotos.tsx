import { Avatar, Box, Flex, Spacer } from '@chakra-ui/react';

interface CadidateCardProps {
  candidatePhoto?: string;
  vicePhoto?: string;
}

export default function CandidatePhotos({
  candidatePhoto,
  vicePhoto,
}: CadidateCardProps) {
  return (
    <Box padding="1rem">
      <Avatar boxSize="140px" src={candidatePhoto} />
      <Spacer height="2rem" />
      <Flex display="flex" justifyContent="center">
        <Avatar boxSize="120px" src={vicePhoto} />
      </Flex>
    </Box>
  );
}

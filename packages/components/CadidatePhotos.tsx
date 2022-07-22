import { Avatar, Box, Flex, Image, Spacer } from '@chakra-ui/react';

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
      <Box display="flex" justifyContent="center">
        <Avatar boxSize="120px" src={vicePhoto} />
      </Box>
    </Box>
  );
}

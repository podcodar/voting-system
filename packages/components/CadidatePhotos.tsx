import { Avatar, Box, Image, Spacer } from '@chakra-ui/react';

interface CadidateCardProps {
  candidatePhoto: string;
  vicePhoto: string;
}

export default function CandidatePhotos({
  candidatePhoto,
  vicePhoto,
}: CadidateCardProps) {
  return (
    <Box padding="1rem">
      <Avatar borderRadius="full" boxSize="140px" src={candidatePhoto} />
      <Spacer height="20px" />
      <Avatar
        borderRadius="full"
        boxSize="120px"
        src={vicePhoto}
        margin="auto"
      />
    </Box>
  );
}

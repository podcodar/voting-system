import { Box, Flex, Image, Spacer } from '@chakra-ui/react';

interface CadidateCardProps {
  source: string;
}

export default function CandidatePhotos({ source }: CadidateCardProps) {
  return (
    <Box padding="1rem">
      <Image borderRadius="full" boxSize="140px" src={source} />
      <Spacer height="20px" />
      <Image borderRadius="full" boxSize="120px" src={source} margin="auto" />
    </Box>
  );
}

import { Box, Image } from '@chakra-ui/react';

interface CadidateCardProps {
  source: string;
}

export default function CandidatePhotos({ source }: CadidateCardProps) {
  return (
    <Box>
      <Image borderRadius="full" boxSize="140px" src={source}></Image>
      <Image borderRadius="full" boxSize="120px" src={source}></Image>
    </Box>
  );
}

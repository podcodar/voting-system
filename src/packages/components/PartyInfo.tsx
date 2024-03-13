import { Box, Text } from '@chakra-ui/react';

interface IPartyInfo {
  candidate?: string;
  vice?: string;
  party?: string;
}

export default function PartyInfo({ candidate, vice, party }: IPartyInfo) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="left"
      px="20px"
      fontSize="32px"
    >
      <Box display="flex" py="5px">
        <Text fontWeight="bold">Candidato: {candidate}</Text>
      </Box>
      <Box display="flex" py="5px">
        <Text fontWeight="bold">Vice: {vice}</Text>
      </Box>
      <Box display="flex" py="5px">
        <Text fontWeight="bold">Partido: {party}</Text>
      </Box>
    </Box>
  );
}

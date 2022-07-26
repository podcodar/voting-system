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
      w="35vw"
      h="35vh"
      justifyContent="center"
      alignItems="left"
      px="20px"
    >
      <Box display="flex" py="5px">
        <Text fontWeight="bold" fontSize="20px">
          Candidato: {candidate}
        </Text>
      </Box>
      <Box display="flex" py="5px">
        <Text fontWeight="bold" fontSize="20px">
          Vice: {vice}
        </Text>
      </Box>
      <Box display="flex" py="5px">
        <Text fontWeight="bold" fontSize="20px">
          Partido: {party}
        </Text>
      </Box>
    </Box>
  );
}

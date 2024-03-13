import { Center, Flex, Heading } from '@chakra-ui/react';

import VotingDisplay from 'src/packages/components/VotingDisplay';
import { useVotingContext } from 'src/packages/features/voting-context';

//TODO: Move to centralized theme
const votingScreenColor = '#D9D9D9';

export default function Display() {
  const { isVoting, endMessage } = useVotingContext();

  return (
    <Flex
      bg={votingScreenColor}
      flexDir="column"
      justify="space-between"
      borderRadius=".625rem"
      w="100%"
      h="100%"
    >
      {isVoting ? <VotingDisplay /> : <VotingEndBox endMessage={endMessage} />}
    </Flex>
  );
}

interface IVotingEndBox {
  endMessage: string;
}

function VotingEndBox({ endMessage }: IVotingEndBox) {
  return (
    <Center
      h="100%"
      w="100%"
      flex="1"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Heading>{endMessage}</Heading>
    </Center>
  );
}

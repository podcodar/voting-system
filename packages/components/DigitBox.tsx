import { Flex, Heading, Input } from '@chakra-ui/react';

import { useVotingContext } from '@packages/features/voting-context';

function DigitBoxInput({ value = '' }) {
  return (
    <Input
      bg="white"
      width="50px"
      height="70px"
      border="1px solid black"
      value={value}
      readOnly
    />
  );
}

export default function DigitBox() {
  const { voteInput } = useVotingContext();
  return (
    <Flex w="35vw" h="35vh" alignItems="center" px="20px" gap="7">
      <Heading>Número</Heading>
      <Flex gap="9">
        <DigitBoxInput value={voteInput[0]} />
        <DigitBoxInput value={voteInput[1]} />
      </Flex>
    </Flex>
  );
}

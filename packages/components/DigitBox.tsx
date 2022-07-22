import { Flex, Heading, Input, Spacer } from '@chakra-ui/react';

export default function DigitBox() {
  return (
    <Flex
      display="flex"
      w="27vw"
      h="35vh"
      justifyContent="center"
      alignItems="center"
      px="20px"
    >
      <Heading>Número</Heading>
      <Flex padding="3rem">
        <Input width="50px" height="70px" border="1px solid black"></Input>
        <Spacer width="2rem" />
        <Input width="50px" height="70px" border="1px solid black"></Input>
      </Flex>
    </Flex>
  );
}

import { Flex, Heading, Input } from '@chakra-ui/react';

export default function DigitBox() {
  return (
    <Flex w="35vw" h="35vh" alignItems="center" px="20px" gap="7">
      <Heading>Número</Heading>
      <Flex gap="9">
        <Input
          width="50px"
          height="70px"
          border="1px solid black"
          value=""
          readOnly
        />
        <Input
          width="50px"
          height="70px"
          border="1px solid black"
          value=""
          readOnly
        />
      </Flex>
    </Flex>
  );
}

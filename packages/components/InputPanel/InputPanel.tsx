import { Flex, Grid } from '@chakra-ui/react';

import { pass } from '@packages/utils/pass';

import BaseButton from '../BaseButton';

import { NumericButton } from './NumericButton';

const digitList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default function InputPanel() {
  return (
    <Flex
      h="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
      px="2"
      backgroundColor="#D9D9D9"
    >
      <Grid
        templateColumns="repeat(3, 1fr)"
        h="45%"
        w="80%"
        gap="5"
        justifyItems="center"
        alignContent="center"
        fontFamily="Inter"
        fontWeight="normal"
        fontSize="1.1rem"
      >
        {digitList.map((num) => (
          <NumericButton key={num} onclick={pass}>
            {num}
          </NumericButton>
        ))}
      </Grid>
      <Flex
        w="80%"
        alignItems="flex-end"
        justifyContent="space-between"
        gap="6"
      >
        <BaseButton onClick={pass} text="Branco" variant="blank" />
        <BaseButton onClick={pass} text="Corrige" variant="correct" />
        <BaseButton onClick={pass} text="Confirma" variant="confirm" />
      </Flex>
    </Flex>
  );
}

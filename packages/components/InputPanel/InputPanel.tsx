import { Flex, Grid } from '@chakra-ui/react';

import { pass } from '@packages/utils/pass';

import BaseButton from '../BaseButton';

import { NumericButton } from './NumericButton';

const generateNumberList = (max = 10) => {
  return Array(max)
    .fill(null)
    .map((_, i) => (i + 1) % max);
};

export default function InputPanel() {
  return (
    <Flex
      h="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
      px="2"
      backgroundColor="blackAlpha.700"
    >
      <Grid
        templateColumns="repeat(3, 1fr)"
        h="30%"
        w="50%"
        gap="1"
        justifyItems="center"
        alignContent="center"
      >
        {generateNumberList().map((num) => (
          <NumericButton key={num} onclick={pass}>
            {String(num)}
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

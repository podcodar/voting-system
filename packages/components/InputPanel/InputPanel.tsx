import { Flex, Grid } from '@chakra-ui/react';

import { useVotingContext } from '@packages/features/voting-context';

import BaseButton from '../BaseButton';

import { NumericButton } from './NumericButton';

const digitList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default function InputPanel() {
  const {
    isBlackSelected,
    updateVoteInput,
    blankHandler,
    confirmHandler,
    clearHandler,
  } = useVotingContext();
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
        h="50%"
        w="100%"
        gap="5"
        justifyItems="center"
        alignContent="center"
        fontFamily="Inter"
        fontWeight="normal"
        fontSize="1.1rem"
        cursor={`${isBlackSelected && 'not-allowed'}`}
      >
        {digitList.map((num) => (
          <NumericButton key={num} clickHandler={updateVoteInput}>
            {num}
          </NumericButton>
        ))}
      </Grid>
      <Flex
        w="100%"
        alignItems="flex-end"
        justifyContent="space-between"
        gap="6"
      >
        <BaseButton clickHandler={blankHandler} text="Branco" variant="blank" />
        <BaseButton
          clickHandler={clearHandler}
          text="Corrige"
          variant="correct"
        />
        <BaseButton
          clickHandler={confirmHandler}
          text="Confirma"
          variant="confirm"
        />
      </Flex>
    </Flex>
  );
}

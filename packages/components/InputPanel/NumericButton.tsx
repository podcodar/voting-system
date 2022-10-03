import { GridItem } from '@chakra-ui/react';

import { useVotingContext } from '@packages/features/voting-context';

import BaseButton from '../BaseButton';

interface Props {
  children: string;
  clickHandler: (input: string) => void;
}

export const NumericButton = (props: Props) => {
  const { children, clickHandler } = props;
  const { isBlackSelected } = useVotingContext();
  const colStart = children === '0' ? 2 : undefined;
  return (
    <GridItem
      w="100%"
      h="100%"
      colStart={colStart}
      pointerEvents={`${isBlackSelected ? 'none' : 'all'}`}
    >
      <BaseButton
        clickHandler={clickHandler}
        text={children}
        variant="number"
      />
    </GridItem>
  );
};

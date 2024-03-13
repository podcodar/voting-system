import { GridItem } from '@chakra-ui/react';

import { useVotingContext } from 'src/packages/features/voting-context';

import BaseButton from '../BaseButton';

interface Props {
  children: string;
  clickHandler: (input: string) => void;
}

export const NumericButton = (props: Props) => {
  const { children, clickHandler } = props;
  const { isBlankSelected } = useVotingContext();
  const colStart = children === '0' ? 2 : undefined;
  return (
    <GridItem
      w="100%"
      h="100%"
      colStart={colStart}
      pointerEvents={`${isBlankSelected ? 'none' : 'all'}`}
    >
      <BaseButton
        clickHandler={clickHandler}
        text={children}
        variant="number"
      />
    </GridItem>
  );
};

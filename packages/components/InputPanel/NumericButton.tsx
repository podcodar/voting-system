import { GridItem } from '@chakra-ui/react';

import BaseButton from '../BaseButton';

interface Props {
  children: string;
  clickHandler: (input: string) => void;
}

export const NumericButton = (props: Props) => {
  const { children, clickHandler } = props;
  const colStart = children === '0' ? 2 : undefined;
  return (
    <GridItem w="100%" h="100%" colStart={colStart}>
      <BaseButton
        clickHandler={clickHandler}
        text={children}
        variant="number"
      />
    </GridItem>
  );
};

import { GridItem } from '@chakra-ui/react';

import BaseButton from '../BaseButton';

interface Props {
  children: string;
  onClick: (input: string) => void;
}

export const NumericButton = (props: Props) => {
  const { children, onClick } = props;
  const colStart = children === '0' ? 2 : undefined;
  return (
    <GridItem w="100%" h="100%" colStart={colStart}>
      <BaseButton onClick={onClick} text={children} variant="number" />
    </GridItem>
  );
};

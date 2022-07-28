import { Button } from '@chakra-ui/react';

type Variant = 'confirm' | 'correct' | 'blank' | 'number';

interface Props {
  onClick: () => void;
  variant: Variant;
  text: string;
}

const VARIANT_MAP: Record<
  Variant,
  { paddingY: number; color: string; fontColor: string }
> = {
  confirm: { paddingY: 8, color: '#46F70C', fontColor: 'white' },
  correct: { paddingY: 5, color: '#FFD600', fontColor: 'white' },
  blank: { paddingY: 5, color: '#ffffff', fontColor: 'black' },
  number: { paddingY: 6, color: '#000000', fontColor: 'white' },
};

export default function BaseButton(props: Props) {
  const { text, onClick, variant } = props;
  const { color, paddingY: paddingY, fontColor } = VARIANT_MAP[variant];
  return (
    <Button
      onClick={onClick}
      bg={color}
      py={paddingY}
      border="1px"
      style={{ color: fontColor }}
      fontWeight="bold"
      boxShadow="md"
      w="100%"
    >
      {text}
    </Button>
  );
}

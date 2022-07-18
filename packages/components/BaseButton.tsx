import { Button } from '@chakra-ui/react';

type Variant = 'confirm' | 'correct' | 'blank' | 'number';

interface Props {
  onClick: () => void;
  variant: Variant;
  text: string;
}

const VARIANT_MAP: Record<
  Variant,
  { padding: number; color: string; fontColor: string }
> = {
  confirm: { padding: 6, color: '#46F70C', fontColor: 'white' },
  correct: { padding: 4, color: '#FFD600', fontColor: 'white' },
  blank: { padding: 4, color: '#ffffff', fontColor: 'black' },
  number: { padding: 4, color: '#000000', fontColor: 'white' },
};

export function BaseButton(props: Props) {
  const { text, onClick, variant } = props;
  const { color, padding, fontColor } = VARIANT_MAP[variant];
  return (
    <Button
      marginLeft={20}
      onClick={onClick}
      bg={color}
      padding={padding}
      border="1px"
      style={{ color: fontColor }}
      fontWeight="bold"
      boxShadow="md"
    >
      {text}
    </Button>
  );
}

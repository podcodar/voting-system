import { Button } from '@chakra-ui/react';

type Variant = 'confirm' | 'correct' | 'blank' | 'number';

interface Props {
  clickHandler: (input: string) => void;
  variant: Variant;
  text: string;
}

const VARIANT_MAP: Record<
  Variant,
  { paddingY: number; color: string; fontColor: string }
> = {
  confirm: { paddingY: 8, color: '#38A169', fontColor: '#FFFFFF' },
  correct: { paddingY: 5, color: '#F56565', fontColor: '#FFFFFF' },
  blank: { paddingY: 5, color: '#F7FAFC', fontColor: '#2D3748' },
  number: { paddingY: 6, color: '#F7FAFC', fontColor: '#2D3748' },
};

export default function BaseButton(props: Props) {
  const { text, clickHandler, variant } = props;
  const { color, paddingY: paddingY, fontColor } = VARIANT_MAP[variant];
  return (
    <Button
      onClick={() => clickHandler(text)}
      bg={color}
      py={paddingY}
      style={{ color: fontColor }}
      fontWeight="bold"
      boxShadow="md"
      w="100%"
    >
      {text}
    </Button>
  );
}

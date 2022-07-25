import { Center, Text } from '@chakra-ui/react';

const VotingInstructions = () => {
  return (
    <Center>
      <Text
        fontSize="16px"
        fontFamily="inter"
        width="377px"
        marginTop="96px"
        textAlign="center"
        fontWeight="700"
      >
        {' '}
        Aperte a tecla VERDE para confirmar seu voto ou VERMELHO para reiniciar
        seu voto{' '}
      </Text>
    </Center>
  );
};

export default VotingInstructions;

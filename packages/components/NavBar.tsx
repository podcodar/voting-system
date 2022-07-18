import {
  Box,
  Button,
  Container,
  Heading,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

import ConfigModal from '@packages/components/ConfigModal';

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navbarBgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box
      position="sticky"
      w="100%"
      top={0}
      shadow="base"
      zIndex={1}
      bg={navbarBgColor}
    >
      <Container
        p="1rem"
        display="flex"
        maxW="5xl"
        justifyContent="space-between"
      >
        <Button onClick={onOpen} colorScheme="blue">
          Configurações Notion <EditIcon paddingLeft="2px" />
        </Button>

        <Heading color="teal.500" as="h3">
          Voting-System
        </Heading>
        <ConfigModal isOpen={isOpen} onClose={onClose} />
      </Container>
    </Box>
  );
}

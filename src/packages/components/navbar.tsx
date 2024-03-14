"use client";

import { Box, Container, Heading, useColorModeValue } from "@chakra-ui/react";

export default function NavBar() {
  const navbarBgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box
      position="sticky"
      w="100%"
      top={0}
      shadow="base"
      zIndex={1}
      bg={navbarBgColor}
    >
      <Container p="1rem" display="flex" maxW="5xl" justifyContent="center">
        <Heading color="teal.500" as="h3">
          Voting-System
        </Heading>
      </Container>
    </Box>
  );
}

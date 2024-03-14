"use client";

import { Heading, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

const HomePage = ({ children }: { children: ReactElement }) => {
  return (
    <Flex
      h="80vh"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      gap={8}
    >
      <Heading as="h1" size="2xl">
        Selecione uma votação{" "}
      </Heading>

      {children}
    </Flex>
  );
};

export default HomePage;

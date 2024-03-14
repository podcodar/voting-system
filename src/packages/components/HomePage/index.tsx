"use client";

import { Heading, Box, Flex, Select, Button } from "@chakra-ui/react";
import Head from "next/head";

import NavBar from "src/packages/components/navbar";

import type { NextPage } from "next";

const HomePage: NextPage = () => {
  const startElection = () => {
    console.log("startElection clicked!");
  };

  return (
    <>
      <NavBar />
      <Flex h="80vh" w="100vw" alignItems="center" justifyContent="center">
        <Box>
          <Head>
            <title>Eleições 2022</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
            <Heading as="h1" size="2xl">
              Selecione uma votação{" "}
            </Heading>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              py="30px"
              gap={8}
            >
              <Select placeholder="Escolha sua Votação">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Button colorScheme="blue" onClick={startElection}>
                Iniciar Votação
              </Button>
            </Box>
          </main>
        </Box>
      </Flex>
    </>
  );
};

export default HomePage;

"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Grid, Center } from "@chakra-ui/react";

import Display from "src/packages/components/Display";
import InputPanel from "src/packages/components/InputPanel/InputPanel";
import { useVotingContext } from "src/packages/features/voting-context";

import type { NextPage } from "next";

const PageLoader = () => {
  const searchParams = useSearchParams();
  const { loadParties } = useVotingContext();

  useEffect(() => {
    const electionId = searchParams.get("electionId") ?? null;

    if (electionId) {
      loadParties(electionId as string);
    }
  }, [loadParties, searchParams]);

  return <></>;
};

const VotingPage: NextPage = () => {
  return (
    <Center>
      <Suspense>
        <PageLoader />
      </Suspense>
      <Grid
        templateColumns="2fr 1fr"
        gap="3"
        h="100vh"
        p="10"
        alignItems="center"
      >
        <Display />
        <InputPanel />
      </Grid>
    </Center>
  );
};

export default VotingPage;

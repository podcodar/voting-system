'use client';

import { CSSReset, ChakraProvider, theme } from '@chakra-ui/react';

import ConfigProvider from '@packages/features/config-context';
import VotingCtxProvider from '@packages/features/voting-context';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />

      <ConfigProvider>
        <VotingCtxProvider>{children}</VotingCtxProvider>
      </ConfigProvider>
    </ChakraProvider>
  );
}

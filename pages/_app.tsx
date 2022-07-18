import '../styles/globals.css';

import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react';

import { withProviders } from '@packages/utils/react';
import ConfigProvider from '@packages/features/config-context';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return withProviders(
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>,
    providers,
  );
}

const providers = [ConfigProvider];

export default MyApp;

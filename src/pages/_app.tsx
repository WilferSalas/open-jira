// @packages
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

// @scripts
import EntriesProvider from '../context/entries/EntriesProvider';
import Layout from '../layout';
import UIProvider from '../context/ui/UIProvider';
import createEmotionCache from '../config/emotion/createEmotionCache';
import { ObjectStructure } from '../interfaces';
import { getTheme, saveTheme } from '../utils';
import { lightTheme, darkTheme } from '../styles/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient());

  const [theme, setTheme] = useState<string>('');

  const systemMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';

  useEffect(() => {
    setTheme(getTheme());
  }, [getTheme, systemMode]);

  const onToggleTheme = (userTheme: string) => {
    const themes: ObjectStructure = {
      dark: 'dark',
      light: 'light',
      system: systemMode,
    };

    setTheme(themes[userTheme]);
    saveTheme(userTheme);
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Open Jira</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <EntriesProvider>
              <UIProvider>
                <Layout onToggleTheme={onToggleTheme}>
                  <Component {...pageProps} />
                  <ReactQueryDevtools initialIsOpen={false} />
                </Layout>
              </UIProvider>
            </EntriesProvider>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

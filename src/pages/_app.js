// import App from 'next/app'
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/global';
import theme from '@styles/theme';

const MyApp = ({ Component, pageProps }) => (
  <>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
    <GlobalStyle />
  </>
);

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;

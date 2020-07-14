import React, { useContext, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import GlobalStyle from '@styles/global';

import GlobalContext from '../GlobalContext';


const EditLayout = ({ children }) => {
  const [, setIsEditMode] = useContext(GlobalContext);

  useEffect(() => {
    setIsEditMode(true);
  }, [setIsEditMode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
        <div id="htmlqueues" />
      </ThemeProvider>
    </div>
  );
};

export default EditLayout;

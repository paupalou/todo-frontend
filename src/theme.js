import React from 'react';
import { ThemeProvider } from 'styled-components';
import {darken} from 'polished';

const Theme = ({ children }) => {
  const theme = {
    mainFont: '"Cabin", sans-serif',
    secondaryFont: '"Righteous", cursive',
    background: 'rgb(69,173,168)',
    backgroundShadow: darken(0.1, 'rgb(69,173,168)'),
    foreground: 'rgb(229,252,194)',
    icons: 'rgb(89,79,79)',
    titles: 'rgb(84,121,128)',
    descriptions: 'gray',
    boxBorder: '2px solid lightgray'
  };

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default Theme;

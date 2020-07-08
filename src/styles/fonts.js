import { css } from 'styled-components';

const IEXBold = '/fonts/IEX-Bold.woff';
const IEXBold2 = '/fonts/IEX-Bold.woff2';

const IEXStandard = '/fonts/IEX-Standard.woff';
const IEXStandard2 = '/fonts/IEX-Standard.woff2';

const IEXText = '/fonts/IEX-Text.woff';
const IEXText2 = '/fonts/IEX-Text.woff2';

const GlobalFonts = css`
  @font-face {
    font-family: 'IEX';
    src: url(${IEXStandard2}) format('woff2'),
      url(${IEXStandard}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'IEX';
    src: url(${IEXBold2}) format('woff2'), url(${IEXBold}) format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'IEXBold';
    src: url(${IEXBold2}) format('woff2'), url(${IEXBold}) format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'IEXText';
    src: url(${IEXText2}) format('woff2'), url(${IEXText}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;
export default GlobalFonts;

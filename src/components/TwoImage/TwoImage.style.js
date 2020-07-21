import styled from 'styled-components';
import { ContentContainer } from '@styles/atoms';
import { font60, iexStandard, iexText, font24 } from '@styles/typography';
import theme from '@styles/theme';

export const TwoImageLayout = styled(ContentContainer)`
  margin-top: ${({ topspacing }) => (topspacing === 'Large' ? '125px' : '0')};
  margin-bottom: ${({ bottomspacing }) =>
    bottomspacing === 'Large' ? '125px' : '0'};

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-top: ${({ topspacing }) => (topspacing === 'Large' ? '30px' : '0')};
    margin-bottom: ${({ bottomspacing }) =>
      bottomspacing === 'Large' ? '30px' : '0'};
    }
`;

export const Image = styled.img`
  margin-bottom: 40px;
`;

export const Title = styled.h3`
  ${font60}
  ${iexStandard}

  &.mobile {
    display: none;
    margin-bottom: 30px;
  }

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    display: none;
    &.mobile {
      display: block;
    }
  }
`;

export const Description = styled.p`
  ${font24}
  ${iexText}
  max-width: 60%;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

export const FullWidthTitle = styled.h3`
  ${font60}
  ${iexStandard}
  margin-bottom: 100px;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-bottom: 30px;
  }
`;

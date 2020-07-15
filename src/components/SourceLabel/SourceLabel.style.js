import styled from 'styled-components';
import { font20, iexBold } from '@styles/typography';
import theme from '@styles/theme';

export const SourceLabel = styled.div`
  display: flex;
  flex-direction: row;


  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    flex-direction: column;
  }
`;

export const From = styled.span`
  position: relative;
  display: block;
  color: ${theme.colors.accent};
  margin-right: 25px;
  ${iexBold}
  ${font20}

  &:before {
    background: ${theme.colors.accent};
    content: ' ';
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 4px;
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
  }
  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-bottom: 10px;
  }
  
`;

export const ContentType = styled.span`
  ${iexBold}
  ${font20}
`;


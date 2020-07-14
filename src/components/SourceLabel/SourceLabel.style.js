import styled from 'styled-components';
import { font20, iexBold } from '@styles/typography';

export const SourceLabel = styled.div`
  display: flex;
  flex-direction: row;
`;

export const From = styled.span`
  position: relative;
  display: block;
  /* color: ${props => props.theme.colors.accent}; */
  margin-right: 25px;
  ${iexBold}
  ${font20}

  &:before {
    /* background: ${props => props.theme.colors.accent}; */
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
`;

export const ContentType = styled.span`
  ${iexBold}
  ${font20}
`;


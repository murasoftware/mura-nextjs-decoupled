import styled from 'styled-components';
import { Column, ContentContainer, H2, BodyCopy } from '@styles/atoms';
import { iexStandard, font140, font30 } from '@styles/typography';
import theme from '@styles/theme';

export const MarketStats = styled(ContentContainer)`
  margin: 150px auto;
`;

export const Copy = styled(Column)``;

export const StatsContainer = styled(Column)``;

export const StatTitle = styled(H2)`
  max-width: 75%;
  margin-bottom: 50px;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    max-width: 100%;
    margin-top: 35px;
    margin-bottom: 20px;
  }
`;

export const StatDescription = styled(BodyCopy)`
  max-width: 75%;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

export const StatValue = styled.p`
  ${font140}
  ${iexStandard}
  margin-bottom: 20px;
  position: relative;

  &:before {
    background: white;
    content: ' ';
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    position: absolute;
    left: -60px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const StatLabel = styled.p`
  ${font30}
  ${iexStandard}
`;

export const Stats = styled.ul``;

export const Stat = styled.li`
  padding-top: 50px;
  padding-bottom: 40px;
  border-bottom: 1px solid ${theme.colors.border};

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

export const SourceColumn = styled(Column)`
  margin-top: 5px;
`;

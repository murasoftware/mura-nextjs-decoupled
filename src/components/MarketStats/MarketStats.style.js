import styled from 'styled-components';
import {  Column, ContentContainer, H2, BodyCopy } from '@styles/atoms';
import { iexStandard, font140, font30 } from '@styles/typography';

export const MarketStats = styled(ContentContainer)`
  margin: 150px auto;
`;

export const Copy = styled(Column)``;

export const StatsContainer = styled(Column)``;

export const StatTitle = styled(H2)`
  margin-bottom: 50px;
`;

export const StatDescription = styled(BodyCopy)``;

export const StatValue = styled.p`
  ${font140}
  ${iexStandard}
  margin-bottom: 20px;
`;

export const StatLabel = styled.p`
 ${font30}
  ${iexStandard}
`;

export const Stats = styled.ul`
`;


export const Stat = styled.li`
  padding-top: 50px;
  padding-bottom: 40px;

  /* border-bottom: 1px solid ${props => props.theme.colors.border}; */

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: none;
  }



`;
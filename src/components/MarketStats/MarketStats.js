import React, { useEffect, useState } from 'react';
import SourceLabel from '@components/SourceLabel';
import { calculateMarketStats } from '@utils/marketStatsHelper';
import { ColumnContainer, Column } from '@styles/atoms';

import 'whatwg-fetch';

import {
  MarketStats,
  Copy,
  StatsContainer,
  StatTitle,
  StatDescription,
  Stats,
  Stat,
  StatValue,
  StatLabel,
} from './MarketStats.style';

const MarketStatsComp = props => {
  const [formattedStats, setStats] = useState([]);
  const {
    businesssource,
    modulename,
    sectiondescription,
    sectiontitle,
  } = props;

  useEffect(() => {
    fetch('/external/realtime.json')
      .then(response => response.json())
      .then(({ stats }) => {
        const formattedStats = calculateMarketStats({ realTime: stats });
        setStats(formattedStats);
      })
      .catch(ex => {
        throw new Error('Failed to parse JSON for Market Stats');
      });
  }, []);

  return (
    <MarketStats>
      <ColumnContainer>
        <Column lcols={4} scols={1}>
          <StatTitle>{sectiontitle}</StatTitle>
        </Column>
        <Column lcols={8} scols={1}>
          <SourceLabel fromLabel={businesssource} contentType={modulename} />
        </Column>
      </ColumnContainer>
      <ColumnContainer>
        <Column lcols={4} scols={1}>
          <StatDescription>{sectiondescription}</StatDescription>
        </Column>
        <Column lcols={8} scols={1}>
          <Stats>
            {formattedStats.map(({ realTime, name }) => (
              <Stat>
                <StatValue>{realTime}</StatValue>
                <StatLabel>{name}</StatLabel>
              </Stat>
            ))}
          </Stats>
        </Column>
      </ColumnContainer>
    </MarketStats>
  );
};

export default MarketStatsComp;

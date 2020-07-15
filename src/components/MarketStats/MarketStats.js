import React, { useEffect, useState } from 'react';
import SourceLabel from '@components/SourceLabel';
import { calculateMarketStats } from '@utils/marketStatsHelper';
import { ColumnContainer, Column } from '@styles/atoms';
import { isMobile } from '@utils/screenSize';

import 'whatwg-fetch';

import {
  MarketStats,
  StatTitle,
  StatDescription,
  Stats,
  Stat,
  StatValue,
  StatLabel,
  SourceColumn,
} from './MarketStats.style';

const MarketStatsComp = props => {
  const [isMobileVal, setIsMobileVal] = useState(false);
  const [formattedStats, setStats] = useState([]);
  const {
    businesssource,
    modulename,
    sectiondescription,
    sectiontitle,
  } = props;

  useEffect(() => {
    setIsMobileVal(isMobile());
    fetch('/external/realtime.json')
      .then(response => response.json())
      .then(({ stats }) => {
        const inStats = calculateMarketStats({ realTime: stats });
        setStats(inStats);
      })
      .catch(() => {
        throw new Error('Failed to parse JSON for Market Stats');
      });
  }, []);

  return (
    <MarketStats>
      <ColumnContainer>
        {isMobileVal && (
          <SourceColumn lcols={8} mcols={6} scols={12}>
            <SourceLabel fromLabel={businesssource} contentType={modulename} />
          </SourceColumn>
        )}
        <Column lcols={4} mcols={6} scols={12}>
          <StatTitle>{sectiontitle}</StatTitle>
        </Column>
        {!isMobileVal && (
          <SourceColumn lcols={8} mcols={6} scols={12}>
            <SourceLabel fromLabel={businesssource} contentType={modulename} />
          </SourceColumn>
        )}
      </ColumnContainer>
      <ColumnContainer>
        <SourceColumn lcols={4} mcols={6} scols={12}>
          <StatDescription>{sectiondescription}</StatDescription>
        </SourceColumn>
        <Column lcols={8} mcols={6} scols={12}>
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

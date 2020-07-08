import React, { useState, useEffect } from 'react';
import { NavStyle, NavLink } from '@styles/atoms';
import { ExternalLink } from '@components/Icons/Icons';
import { isMobile } from '@utils/screenSize';

import {
  Footer,
  FooterColumn,
  FooterAddress,
  TagLine,
  TagLineLink,
  LinkRow,
  RightContainer,
} from './Footer.style';

const FooterComponent = props => {
  const [isMobileState, setIsMobileState] = useState(false);
  useEffect(() => {
    setIsMobileState(isMobile());
  }, []);

  const {
    footerTagLine = 'Technology that works for everyone',
    contactText = 'Contact IEX Group',
    contactLink = 'https://iextrading.com',
    address1 = `3 World Trade Center`,
    address2 = '58th Floor',
    address3 = 'New York, NY 10007',
    phoneNumber = '646.343.6000',
    cookieText = 'Cookie Policy',
    cookieLink = 'https://iextrading.com',
    privacyText = 'Privacy Policy',
    privacyLink = 'https://iextrading.com',
  } = props;

  const columns = [
    {
      title: 'IEX Exchange',
      link: 'https://iextrading.com',
      subTitle: 'Contact IEX Exchange',
      desc: 'Where the quest for fairness and transparency began.',
    },
    {
      title: 'IEX Exchange',
      link: 'https://iextrading.com',
      subTitle: 'Contact IEX Exchange',
      desc: 'Where the quest for fairness and transparency began.',
    },
    {
      title: 'IEX Exchange',
      link: 'https://iextrading.com',
      subTitle: 'Contact IEX Exchange',
      desc: 'Where the quest for fairness and transparency began.',
    },
    {
      title: 'IEX Exchange',
      link: 'https://iextrading.com',
      subTitle: 'Contact IEX Exchange',
      desc: 'Where the quest for fairness and transparency began.',
    },
  ];

  const renderContactColumn = () => (
    <FooterColumn lcols={4} scols={12}>
      <TagLine>{footerTagLine}</TagLine>
      <NavLink href={contactLink}>{contactText}</NavLink>
      <FooterAddress>
        {address1}
        <br />
        {address2}
        <br />
        {address3}
        <br />
        {phoneNumber}
      </FooterAddress>
      <LinkRow>
        <NavLink href={cookieLink}>{cookieText}</NavLink>
        <NavLink href={privacyLink}>{privacyText}</NavLink>
      </LinkRow>
    </FooterColumn>
  );

  return (
    <Footer>
      {!isMobileState && renderContactColumn()}
      <RightContainer lcols={8} scols={12}>
        {columns.map(({ link, title, subTitle, desc }) => (
          <FooterColumn lcols={3} mcols={6} scols={12}>
            <TagLineLink href={link}>
              <span>{title}</span>
              <ExternalLink />
            </TagLineLink>
            <NavLink href={contactLink}>{subTitle}</NavLink>
            <NavStyle>{desc}</NavStyle>
          </FooterColumn>
        ))}
      </RightContainer>
      {isMobileState && renderContactColumn()}
    </Footer>
  );
};

export default FooterComponent;

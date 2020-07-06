import React from 'react';
import Head from 'next/head';
import MainRouter from '../components/MainRouter';
import MainLayout from '../components/MainLayout';
import DisplayRegion from '../components/DisplayRegion';
import { getMuraProps, getRootPath } from '../helpers/MuraHelper';

export async function getStaticProps(context) {
  // console.log("CON",context);
  const props = await getMuraProps(context);
  return props;
}


export default function Page(props) {
  const {
    navigation,
    content = {},
    content: { displayregions } = {},
    content: {
      displayregions: { primarycontent } = {},
    },
    moduleStyleData,
  } = props;

  return (
    <MainLayout {...props}>
      <Head>
        <link
          href={`${getRootPath()}/core/modules/v1/core_assets/css/mura.10.min.css`}
          rel="stylesheet"
          key="min"
        />
        <link
          href={`${getRootPath()}/core/modules/v1/core_assets/css/mura.10.skin.css`}
          rel="stylesheet"
          key="skin"
        />
      </Head>
      <MainRouter items={navigation} />
      {content && displayregions && primarycontent && (
        <DisplayRegion
          region={primarycontent}
          moduleStyleData={moduleStyleData}
        />
      )}
    </MainLayout>
  );
}


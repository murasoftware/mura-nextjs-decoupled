import React from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import DisplayRegion from '../components/DisplayRegion';
import { getMuraProps, getRootPath } from '../helpers/MuraHelper';

export async function getStaticProps(context) {
  // console.log("CON",context);
  const props = await getMuraProps(context,false);
  return props;
}


export default function Page(props) {

  const {
    content = {},
    content: { displayregions } = {},
    content: {
      displayregions: { primarycontent,footer,navigation } = {},
    },
    moduleStyleData
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
      {content && displayregions && navigation && (
        <DisplayRegion
          region={navigation}
          moduleStyleData={moduleStyleData}
        />
      )}
      {content && displayregions && primarycontent && (
        <DisplayRegion
          region={primarycontent}
          moduleStyleData={moduleStyleData}
        />
      )}
      {content && displayregions && footer && (
        <DisplayRegion
          region={footer}
          moduleStyleData={moduleStyleData}
        />
      )}
    </MainLayout>
  );
}


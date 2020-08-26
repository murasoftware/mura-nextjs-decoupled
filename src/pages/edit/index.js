import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import EditLayout from '../../components/EditLayout';
import MainLayout from '../../components/MainLayout';
import DisplayRegion from '../../components/DisplayRegion';
import { getMuraProps, getRootPath } from '../../helpers/MuraHelper';

export async function getServerSideProps(context) {
  const props = await getMuraProps(context,true);

  return props;
}

function Edit(props) {
  const router = useRouter();

  /*
   When in a route not defined in static routes it's intitially missing props
  */
  if(!props.content){
    return '';
  }

  const {
    content = {},
    content: { displayregions } = {},
    content: {
      displayregions: { primarycontent,footer,header } = {},
    },
    moduleStyleData
  } = props;

  return (
    <EditLayout {...props}>
      <MainLayout {...props} route={`/${router.query.page}`}>
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
        {content && displayregions && header && (
          <DisplayRegion
            region={header}
            moduleStyleData={moduleStyleData}
            content={content}
          />
        )}
        {content && displayregions && primarycontent && (
          <DisplayRegion
            region={primarycontent}
            moduleStyleData={moduleStyleData}
            content={content}
          />
        )}
        {content && displayregions && footer && (
          <DisplayRegion
            region={footer}
            moduleStyleData={moduleStyleData}
            content={content}
          />
        )}
      </MainLayout>
    </EditLayout>
  );
}

export default Edit;

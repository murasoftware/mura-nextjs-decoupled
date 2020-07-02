import React from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import MainRouter from "../components/MainRouter";
import MainLayout from "../components/MainLayout";
import DisplayRegion from "../components/DisplayRegion";
import {getMuraProps,getRootPath,getMuraPaths} from "../helpers/MuraHelper";

export async function getStaticPaths() {
  const paths = await getMuraPaths();
  
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // console.log("CON",context);
  const props = await getMuraProps(context);
  return props;
}

export default function Page(props) { 
  const { modules, navigation } = props;
  const router = useRouter();

  return (
    <MainLayout {...props}>
      <Head>
        <link href={`${getRootPath()  }/core/modules/v1/core_assets/css/mura.10.min.css`} rel="stylesheet" key="min"/>
        <link href={`${getRootPath()  }/core/modules/v1/core_assets/css/mura.10.skin.css`} rel="stylesheet" key="skin"/>
      </Head>
      <MainRouter items={navigation} />
      {props.content && props.content.displayregions && props.content.displayregions.primarycontent && <DisplayRegion props={props} region={props.content.displayregions.primarycontent} />}
    </MainLayout>
  );

}

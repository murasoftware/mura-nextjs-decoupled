import MainRouter from "../components/MainRouter";
import MainLayout from "../components/MainLayout";
import DisplayRegion from "../components/DisplayRegion";
import {getData} from "../helpers/DataFetch";
import Link from "next/link";
import React,{Fragment} from "react";
import { useRouter } from "next/router";
import MuraHelper from "../helpers/MuraFetch";
import MuraFetch,{getMuraPaths} from "../helpers/MuraFetch";

export async function getStaticPaths(context) {
  const paths = await getMuraPaths(context);
  
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let props = await MuraFetch(context);
//  console.log(props);
  return props;
}

export default function Slug(props) { 
  const { route, content, title, children, navigation } = props;
  const router = useRouter();

  return (
    <MainLayout {...props}>
    <MainRouter items={navigation} />
      {content && <DisplayRegion {...props} />}
    </MainLayout>
  );

}

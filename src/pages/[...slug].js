import MainRouter from "../components/MainRouter";
import MainLayout from "../components/MainLayout";
import DisplayRegion from "../components/DisplayRegion";
import {getData} from "../helpers/DataFetch";
import Link from "next/link";
import React,{Fragment} from "react";
import { useRouter } from "next/router";
import MuraHelper,{getMuraPaths} from "../helpers/MuraHelper";

export async function getStaticPaths() {
  const paths = await getMuraPaths();
  
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let props = await MuraHelper(context);
  return props;
}

export default function Slug(props) { 
  const { modules, navigation } = props;
  const router = useRouter();

  return (
    <MainLayout {...props}>
    <MainRouter items={navigation} />
      {modules && <DisplayRegion {...props} />}
    </MainLayout>
  );

}

import MainRouter from "../components/MainRouter";
import MainLayout from "../components/MainLayout";
import DisplayRegion from "../components/DisplayRegion";
import {getData} from "../helpers/DataFetch";
import Link from "next/link";
import React,{Fragment} from "react";
import { useRouter } from "next/router";

export async function getStaticPaths(context) {
  const json = await getData("http://localhost:8888//index.cfm/_api/json/v1/default//content");
  const paths = json.data.items.map((item) => {
    return { params: { slug: [`${item.filename}`] } };
  });
  
  return {
    paths: paths,
    fallback: false,
  };
}



export async function getStaticProps(context) {
  
  const navigation = await getData("http://localhost:8888//index.cfm/_api/json/v1/default//content")
  const json = await getData(`http://localhost:8888//index.cfm/_api/json/v1/default//content/_path/${context.params.slug}`)
  
  const content = json.data.displayregions.primarycontent.local.items.map((item) => {  
    return item;
  });

  return {
    props: {
      navigation,
      title: "in [name.js]",
      content,
      url: "http://localhost:8888//index.cfm/_api/json/v1/default//content",
    },
  };
}

export default function Slug(props) {
  
  const { route, content, title, children, navigation } = props;
  const router = useRouter();
  
  return (
    <MainLayout {...props}>
    <MainRouter items={navigation.data.items} />
      <DisplayRegion {...props} />
    </MainLayout>
  );
}

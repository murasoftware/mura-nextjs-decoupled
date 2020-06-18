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
    return { params: { slug: item.filename.split('/') } };
  });
  
  return {
    paths: paths,
    fallback: false,
  };
}



export async function getStaticProps(context) {
  
  const navigation = await getData("http://localhost:8888//index.cfm/_api/json/v1/default//content")
  const json = await getData(`http://localhost:8888//index.cfm/_api/json/v1/default//content/_path/${context.params.slug}`)
  let content = null;
  const displayregions = json.data.displayregions;
  const displayregionnames = json.data.displayregionnames.map((name) => name.toLowerCase().replace(/\s/g, ''));
  
  console.log("getStaticProps -> displayregionnames", displayregionnames)
  
  if(displayregions && displayregions.primarycontent){
    content = json.data.displayregions.primarycontent.local.items.map((item) => {  
      return item;
    });
    console.log(content);
  }
  
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
      {content && <DisplayRegion {...props} />}
    </MainLayout>
  );
}

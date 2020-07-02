import EditLayout from "../../components/EditLayout";
import { useRouter } from "next/router";
import Page from "../[...page]";
import {getMuraProps, getRootPath} from "../../helpers/MuraHelper";
import Head from 'next/head';

export async function getServerSideProps(context) {
  let props = await getMuraProps(context);

  return props;
}

function Edit(props) {
  const router = useRouter();

  return (
    <EditLayout {...props}>
      <Head>
        <link href={getRootPath() + '/core/modules/v1/core_assets/css/mura.10.min.css'} rel="stylesheet" key="min"/>
        <link href={getRootPath() + '/core/modules/v1/core_assets/css/mura.10.skin.css'} rel="stylesheet" key="skin"/>
      </Head>
      <Page {...props} route={`/${router.query.page}`} />
    </EditLayout>
  );
}

export default Edit;

// router.pathname

import EditLayout from "../../components/EditLayout";
import { useRouter } from "next/router";
import Slug from "../[...slug]";
import { getData } from "../../helpers/DataFetch";
import MuraFetch,{getMuraPaths} from "../../helpers/MuraFetch";

export async function getServerSideProps(context) {
  let props = await MuraFetch(context);
  // console.log("getServerSideProps -> context", context)
  return props;
}

function Edit(props) {
  const router = useRouter();
  
  return (
    <EditLayout>
      <Slug {...props} route={`/${router.query.page.join("/")}`} />
      <div id="htmlqueues"></div>
    </EditLayout>
  );
}

export default Edit;

// router.pathname

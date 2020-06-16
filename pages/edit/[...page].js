import EditLayout from "../../components/EditLayout";
import { useRouter } from "next/router";
import Slug from "../[...slug]";
import { getData } from "../../helpers/DataFetch";


export async function getServerSideProps(context) {
  const navigation = await getData(
    "http://localhost:8888//index.cfm/_api/json/v1/default//content"
  );
  const json = await getData(
    `http://localhost:8888//index.cfm/_api/json/v1/default//content/_path/${context.query.page}`
  );
  const content = json.data.displayregions.primarycontent.local.items.map(
    (item) => {
      return item;
    }
  );

  return {
    props: {
      navigation,
      title: "in [name.js]",
      content,
      url: "http://localhost:8888//index.cfm/_api/json/v1/default//content",
    },
  };
}

function Edit(props) {
  const router = useRouter();
  return (
    <EditLayout>
      
      <Slug {...props} route={`/${router.query.page}`} />
    </EditLayout>
  );
}

export default Edit;

// router.pathname

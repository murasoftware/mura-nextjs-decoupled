import Mura from 'mura.js';

let muraIsInit = false;

export const getMuraPaths = async context => {
  context = context === null ? {} : context;
  muraInit(context);

  const pathList = await getPrimaryNavData();

  const paths = pathList.map(item => {
    return { params: { slug: item.filename.split('/') } };
  });
  return paths;
};

function muraInit(context) {
  // console.log("MURA INIT: ", muraIsInit);

  if (muraIsInit) return;

  //  console.log("PATHS CONTEXT: ",context);

  Mura.init({
    rootpath: 'http://localhost:8888',
    siteid: 'default',
    processMarkup: false,
  });
  muraIsInit = true;
}

const MuraFetch = async context => {
  muraInit(context);

  //Don't rely on ready event for when to fire
  Mura.holdReady(true);

  let modules = [];

  // console.log("MuraFetch -> context", context)
  const muraObject = await renderContent(context);
  const navigation = await getPrimaryNavData();
  const content = muraObject.properties;

  if (content.displayregions && content.displayregions.primarycontent) {
    modules = content.displayregions.primarycontent.local.items.map(item => {
      return item;
    });
  }

  Mura.holdReady(false);

  return {
    props: {
      navigation,
      title: 'in [name.js]',
      content: modules,
      url: 'http://localhost:8888//index.cfm/_api/json/v1/default//content',
    },
  };
};

function renderContent(context) {
  let query = {};

  if (context.query) {
    query = context.query;
  } else {
    query = { page: context.params.slug };
  }

  let filename = '';

  if (context.params && context.params.page) {
    filename = context.params.page.join("/");
  } else if (context.params && context.params.slug) {
    filename = context.params.slug.join("/");
  }
console.log("renderContent -> context.params ", context.params )
  console.log('renderContent -> filename', filename);

  return Mura.renderFilename(filename, query).then(
    rendered => {
      return rendered;
    },
    rendered => {
      if (!rendered) {
        return Mura.getEntity('Content').set({
          title: '404',
          menutitle: '404',
          body: 'The content that you requested can not be found',
          contentid: Mura.createUUID(),
          isnew: 1,
          siteid: Mura.siteid,
          type: 'Page',
          subtype: 'Default',
          contentid: Mura.createUUID(),
          contenthistid: Mura.createUUID(),
          filename: '404',
        });
      } else {
        return rendered;
      }
    },
  );
}

function getPrimaryNavData() {
  return Mura.getFeed('content')
    .where()
    .prop('parentid')
    .isEQ(Mura.homeid)
    .sort('orderno')
    .getQuery()
    .then(collection => {
      let tempArray = collection.getAll().items;
      tempArray.unshift({
        url: '/',
        menutitle: 'Home',
        title: 'Home',
        filename: '',
        contentid: Mura.homeid,
      });
      return tempArray;
    });
}

export default MuraFetch;

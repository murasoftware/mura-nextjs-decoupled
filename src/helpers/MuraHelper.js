/* eslint-disable */
import Mura from 'mura.js';
import Example from '../components/Example';
import Text, { getTextProps } from '../components/Text';
import Video from '../components/Video';
import Image from '../components/Image';
import Container from '../components/Container';
import Embed from '../components/Embed';
import Hr from '../components/Hr';
import React from 'react';
import ReactDOM from 'react-dom';

//This module is also registered with Mura via the ./static/mura.config.json

let moduleRegistry = [
  {
    name: 'Example',
    component: Example,
  },
  {
    name: 'Text',
    component: Text,
    getDynamicProps: getTextProps,
  },
  {
    name: 'Video',
    component: Video,
  },
  {
    name: 'Image',
    component: Image,
  },
  {
    name: 'Container',
    component: Container,
  },
  {
    name: 'Hr',
    component: Hr,
  },
  {
    name: 'Embed',
    component: Embed,
  },
];

let moduleLookup = {};

moduleRegistry.forEach(module => {
  module.getDynamicProps =
    module.getDynamicProps ||
    function() {
      return {};
    };
  moduleLookup[module.name] = {
    component: module.component,
    getDynamicProps: module.getDynamicProps,
  };

  if (!module.excludeFromClient) {
    Mura.Module[module.name] = Mura.UI.extend({
      component: module.component,
      renderClient() {
        ReactDOM.render(
          React.createElement(this.component, this.context),
          this.context.targetEl,
          () => {
            this.trigger('afterRender');
          },
        );
      },
    });
  }
});

Mura.Module.Container.reopen({
  reset(self, empty) {
    self.find('.mura-object:not([data-object="container"])').html('');
    self.find('.frontEndToolsModal').remove();
    self.find('.mura-object-meta').html('');
    var content = self.children('div.mura-object-content');

    if (content.length) {
      var nestedObjects = [];
      content.children('.mura-object').each(function() {
        Mura.resetAsyncObject(this, empty);
        //console.log(Mura(this).data())
        nestedObjects.push(Mura(this).data());
      });
      self.data('items', JSON.stringify(nestedObjects));
      self.removeAttr('data-content');
    }
  },
});

let muraIsInit = false;
let contextIsInit = false;

export const getComponent = item => {
  getMura();

  const objectkey = Mura.firstToUpperCase(item.object);

  if (typeof moduleLookup[objectkey] != 'undefined') {
    const ComponentVariable = moduleLookup[objectkey].component;
    return <ComponentVariable key={item.instanceid} {...item} />;
  }

  return <p key={item.instanceid}>DisplayRegion: {item.objectname}</p>;
};

export const getMuraPaths = async () => {
  const pathList = await getPrimaryNavData();

  const paths = pathList
    .map(item => {
      return { params: { page: item.filename.split('/') } };
    })
    .filter(function(item) {
      return item.params.page.length;
    });

  return paths;
};

export const getMura = context => {
  if (context && context.res && !contextIsInit) {
    Mura.init({
      rootpath: 'http://localhost:8888',
      siteid: 'default',
      processMarkup: false,
      response: context.res,
      request: context.req,
      editroute: '/edit',
    });
    contextIsInit = true;
    muraIsInit = true;
  } else if (!muraIsInit) {
    Mura.init({
      rootpath: 'http://localhost:8888',
      siteid: 'default',
      processMarkup: false,
      editroute: '/edit',
    });
    muraIsInit = true;
  }

  Mura.holdReady(true);

  return Mura;
};

export const getRootPath = () => {
  return getMura().rootpath;
};

export const getMuraProps = async (context,isEditMode) => {
  getMura(context);

  const muraObject = await renderContent(context);
  const navigation = await getPrimaryNavData();
  const content = muraObject.getAll();
  const moduleStyleData = await getRegionProps(muraObject,isEditMode);

  const props = {
    navigation,
    content: content,
    moduleStyleData: moduleStyleData,
  };

  return {
    props,
  };
};

async function renderContent(context) {
  let query = {};

  if (context.browser) {
    query = Mura.getQueryStringParams();
  } else if (context.query) {
    query = context.query;
  }

  let filename = '';

  if (context.params && context.params.page) {
    filename = context.params.page;
  }

  return await Mura.renderFilename(filename, query).then(
    async rendered => {
      return rendered;
    },
    async rendered => {
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
          displayregions:{
            primarycontent:{
              local:{
                items:[]
              }
            }
          }
        });
      } else {
        return rendered;
      }
    },
  );
}

async function getPrimaryNavData() {
  getMura();

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

async function getRegionProps(content,isEditMode) {
  getMura();
  let moduleStyleData = {};

  Object.values(content.get('displayregions')).forEach(async region => {
    if (
      typeof region.inherited != 'undefined' &&
      Array.isArray(region.inherited.items)
    ) {
      region.inherited.items.forEach(async item => {
        item.instanceid = item.instanceid || Mura.createUUID();
        moduleStyleData[item.instanceid] = await getModuleProps(
          item,
          moduleStyleData,
          isEditMode
        );
      });
    }
    region.local.items.forEach(async item => {
      item.instanceid = item.instanceid || Mura.createUUID();
      moduleStyleData[item.instanceid] = await getModuleProps(
        item,
        moduleStyleData,
        isEditMode
      );
    });
  });

  return moduleStyleData;
}

async function getModuleProps(item, moduleStyleData,isEditMode) {
  getMura();

  const objectkey = Mura.firstToUpperCase(item.object);
  if (typeof moduleLookup[objectkey] != 'undefined') {
    item.dynamicProps = await moduleLookup[objectkey].getDynamicProps(item);
    if (item.object == 'container') {
      if (
        typeof item.object.items != 'undefined' &&
        !Array.isArray(item.object.items)
      ) {
        try {
          item.object.items = JSON.parse(item.object.items);
        } catch (e) {
          item.object.items = [];
        }
      }
      item.items.forEach(async item => {
        item.instanceid = item.instanceid || Mura.createUUID();
        moduleStyleData[item.instanceid] = await getModuleProps(
          item,
          moduleStyleData,
          isEditMode
        );
      });
    }
  }

 
    const styleData = Mura.recordModuleStyles(item);
    
    return {
      isEditMode:isEditMode,
      cssRules: styleData.cssRules,
      targets: styleData.targets,
      id: 'mura-styles' + item.instanceid,
      stylesupport: item.stylesupport || {},
    };

 
}

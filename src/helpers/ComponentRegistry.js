import Mura from 'mura.js';
import Example from '../components/Example';
import Text, {getDynamicProps as  getTextProps } from '../components/Text';
import Collection, {getDynamicProps as getCollectionProps } from '../components/Collection';
import Video from '../components/Video';
import Image from '../components/Image';
import Container from '../components/Container';
import Embed from '../components/Embed';
import Hr from '../components/Hr';
import PrimaryNav,{getDynamicProps as getPrimaryNavProps} from '../components/PrimaryNav';
import CTAButton from '../components/CTAButton';

import DefaultLayout from '../components/DefaultLayout';
import CollectionLayout,{getQueryProps as getCollectionLayoutProps} from '../components/CollectionLayout';
import CollectionLayoutCards from '../components/CollectionLayoutCards';
import CollectionLayoutList from '../components/CollectionLayoutList';
import CollectionLayoutAccordion from '../components/CollectionLayoutAccordion';
import CollectionLayoutAlternatingBoxes from '../components/CollectionLayoutAlternatingBoxes';
import CollectionLayoutAlternatingRows from '../components/CollectionLayoutAlternatingRows';
import CollectionLayoutMasonry from '../components/CollectionLayoutMasonry';

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
    name: 'Collection',
    component: Collection,
    getDynamicProps: getCollectionProps,
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
  {
    name: 'CollectionLayout',
    component: CollectionLayout,
    getQueryProps: getCollectionLayoutProps,
    excludeFromClient: true
  },
  {
    name: 'DefaultLayout',
    component: DefaultLayout,
    excludeFromClient: true
  },
  {
    name: 'PrimaryNav',
    component: PrimaryNav,
    getDynamicProps: getPrimaryNavProps,
  },
  {
    name: 'CTAButton',
    component: CTAButton,
  },
  {
    name: 'CollectionLayoutCards',
    component: CollectionLayoutCards,
    excludeFromClient: true
  },
  {
    name: 'CollectionLayoutList',
    component: CollectionLayoutList,
    excludeFromClient: true
  },
  {
    name: 'CollectionLayoutAccordion',
    component: CollectionLayoutAccordion,
    excludeFromClient: true
  },
  {
    name: 'CollectionLayoutAlternatingBoxes',
    component: CollectionLayoutAlternatingBoxes,
    excludeFromClient: true
  },
  {
    name: 'CollectionLayoutAlternatingRows',
    component: CollectionLayoutAlternatingRows,
    excludeFromClient: true
  },
  {
    name: 'CollectionLayoutMasonry',
    component: CollectionLayoutMasonry,
    excludeFromClient: true
  }
];

let moduleLookup = {};

moduleRegistry.forEach(module => {
  module.getDynamicProps =
    module.getDynamicProps ||
    function() {
      return {};
    };
  module.getQueryProps =
    module.getQueryProps ||
    function() {
      return {fields:''};
    };
  moduleLookup[module.name] = {
    component: module.component,
    getDynamicProps: module.getDynamicProps,
    getQueryProps: module.getQueryProps
  };

  if (!module.excludeFromClient) {
    Mura.Module[module.name] = Mura.UI.extend({
      component: module.component,
      renderClient() {
        
        const content = Mura.content.getAll();

        ReactDOM.render(
          React.createElement(this.component, {...this.context,content}),
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

export default moduleLookup;
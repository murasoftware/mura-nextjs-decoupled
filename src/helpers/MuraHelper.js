import Mura from 'mura.js'
import Example from '../components/Example'
import Text from '../components/Text'
import Video from '../components/Video'
import Image from '../components/Image'
import Container from '../components/Container'

require('mura.js/src/core/ui.react');

// This module is also registered with Mura via the ./static/mura.config.json

const moduleRegistry=[
	{	
		name:'Example',
		component:Example
	},
	{	
		name:'Text',
		component:Text
	},
	{	
		name:'Video',
		component:Video
	},
	{	
		name:'Image',
		component:Image
	},
	{	
		name:'Container',
		component:Container,
		excludeFromClient:true
	}
];

const moduleLookup={};

moduleRegistry.forEach((module)=>{
	moduleLookup[module.name]=module.component;
	if(!module.excludeFromClient){
		Mura.Module[module.name]=Mura.UI.React.extend({
			component:module.component
		});
	}
});

let muraIsInit = false;
let contextIsInit = false;

export const getComponent = (item) => {
	getMura();

	const objectkey=Mura.firstToUpperCase(item.object);
	
	if(typeof moduleLookup[objectkey] !== 'undefined'){
		const ComponentVariable=moduleLookup[objectkey]
		return  <ComponentVariable key={item.instanceid} {...item} />;
	} 

	return <p key={item.instanceid}>DisplayRegion: {item.objectname}</p>;

  };

export const getMuraPaths = async() => {
	const pathList = await getPrimaryNavData();

	const paths = pathList.map((item) => ({ params: { page: item.filename.split('/') } }));
	return paths;
}

export const getMura = (context) => {
	if(context && context.res && !contextIsInit) {
		Mura.init({
			rootpath:"http://localhost:8888",
			siteid:"default",
			processMarkup:false,
			response:context.res,
			request:context.req,
			editroute:"/edit"
		});
		contextIsInit = true;
		muraIsInit = true;
	}
	else if(!muraIsInit) {
		Mura.init({
			rootpath:"http://localhost:8888",
			siteid:"default",
			processMarkup:false,
			editroute:"/edit"
		});
		muraIsInit = true;
	}
	return Mura;
}

export const getRootPath = () => getMura().rootpath

export const getMuraProps = async (context) => {
	const modules = [];

	getMura(context);

	// Don't rely on ready event for when to fire
	Mura.holdReady(true);

	const muraObject = await renderContent(context);
	const navigation = await getPrimaryNavData();
	const content = muraObject.getAll();

	Mura.holdReady(false);

	const props = {
		navigation,
		content
	  } 

	  return {
		props
	};
}

async function renderContent(context) {
	let query={};

	if(context.browser) {
		query=Mura.getQueryStringParams()
	} else if (context.query) {
		query=context.query
	}
	
	let filename='';

	if(context.params && context.params.page) {
		filename = context.params.page;
	}
	console.log(filename);

	return Mura.renderFilename(filename,query).then((rendered)=>rendered,(rendered)=>{
		if(!rendered){
			return Mura
				.getEntity('Content')
				.set({
					title:'404',
					menutitle:'404',
					body:'The content that you requested can not be found',
					contentid: Mura.createUUID(),
					isnew:1,
					siteid: Mura.siteid,
					type: 'Page',
					subtype: 'Default',
					contentid: Mura.createUUID(),
					contenthistid: Mura.createUUID(),
					filename:"404"
				})
		} 
			return rendered
		
    })
}

async function getPrimaryNavData() {
	getMura();

	return Mura.getFeed('content')
		.where()
		.prop('parentid').isEQ(Mura.homeid)
		.sort('orderno')
		.getQuery()
		.then(collection=>{
			const tempArray=collection.getAll().items;
			tempArray.unshift({url:"/",menutitle:"Home",title:"Home",filename:"",contentid:Mura.homeid});
			return tempArray;
		});
}

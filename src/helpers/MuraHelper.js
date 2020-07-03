import Mura from 'mura.js'
import Example from '../components/Example'
import Text,{getTextProps} from '../components/Text'
import Video from '../components/Video'
import Image from '../components/Image'
import Container from '../components/Container'
import React from 'react'
import ReactDOM from 'react-dom'

//This module is also registered with Mura via the ./static/mura.config.json

let moduleRegistry=[
	{	
		name:'Example',
		component:Example
	},
	{	
		name:'Text',
		component:Text,
		getDynamicProps:getTextProps
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
		component:Container
	}
];

let moduleLookup={};

moduleRegistry.forEach((module)=>{
	module.getDynamicProps=module.getDynamicProps || function(){return {}};
	moduleLookup[module.name]={
		component:module.component,
		getDynamicProps:module.getDynamicProps
	};

	if(!module.excludeFromClient){
		Mura.Module[module.name]=Mura.UI.extend({
			component:module.component,
			renderClient(){
				ReactDOM.render(
					React.createElement(this.component, this.context),
					this.context.targetEl,
					()=>{this.trigger('afterRender')}
				);
			}
		});
	}
});

Mura.Module.Container.reopen({
	reset(self,empty){ 
        self.find('.mura-object:not([data-object="container"])').html('');
        self.find('.frontEndToolsModal').remove();
        self.find('.mura-object-meta').html('');
        var content = self.children('div.mura-object-content');

        if (content.length) {
            var nestedObjects=[];
            content.children('.mura-object').each(
                function() {
                    Mura.resetAsyncObject(this,empty);	
                    //console.log(Mura(this).data())
                    nestedObjects.push(Mura(this).data());
                }
            );
            self.data('items', JSON.stringify(nestedObjects));
            self.removeAttr('data-content');
        }
	}	
})

let muraIsInit = false;
let contextIsInit = false;

export const getComponent = (item) => {
	getMura();

	const objectkey=Mura.firstToUpperCase(item.object);
	
	if(typeof moduleLookup[objectkey] != 'undefined'){
		const ComponentVariable=moduleLookup[objectkey].component;
		return  <ComponentVariable key={item.instanceid} {...item} />;
	} 

	return <p key={item.instanceid}>DisplayRegion: {item.objectname}</p>;

}

export const getMuraPaths = async() => {
	const pathList = await getPrimaryNavData();
	
	const paths = pathList.map((item) => {
		console.log(item.filename)
		return { params: { page: item.filename.split('/') } };
	});
	
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

export const getRootPath = () => {
	return getMura().rootpath;
}

export const getMuraProps = async (context) => {
	let modules = [];

	getMura(context);

	//Don't rely on ready event for when to fire
	Mura.holdReady(true);

	const muraObject = await renderContent(context);
	const navigation = await getPrimaryNavData();
	const content = muraObject.getAll();

	Mura.holdReady(false);

	const props = {
		navigation,
		content: content
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

	return await Mura.renderFilename(filename,query).then(async (rendered)=>{
		
		await getRegionProps(rendered);
		
		return rendered;
	},async (rendered)=>{
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
		} else {

			await getRegionProps(rendered);
			
			return rendered
		}
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
			let tempArray=collection.getAll().items;
			tempArray.unshift({url:"/",menutitle:"Home",title:"Home",filename:"",contentid:Mura.homeid});
			return tempArray;
		});
}

async function getRegionProps(content) {
	getMura();
	Object.values(content.get('displayregions')).forEach(async (region)=>{
		if(
			typeof region.inherited != 'undefined'
			&& Array.isArray(region.inherited.items)
		){
			region.inherited.items.forEach(async(item)=>{
				await getModuleProps(item)
			})
		}
		region.local.items.forEach(async(item)=>{
			await getModuleProps(item)
		});
	});
	
}

async function getModuleProps(item) {
	getMura();
	const objectkey=Mura.firstToUpperCase(item.object);
	if(typeof moduleLookup[objectkey] != 'undefined'){
		item.dynamicprops=await moduleLookup[objectkey].getDynamicProps(item);
		if(item.object=='container' && Array.isArray(item.object.items)){
			item.items.forEach(async(item)=>{
				await getModuleProps(item)
			});
		}
	}
}



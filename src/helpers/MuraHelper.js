import Mura from 'mura.js';

let muraIsInit = false;
let contextIsInit = false;

export const getMuraPaths = async() => {
	const pathList = await getPrimaryNavData();

	const paths = pathList.map((item) => {
		return { params: { slug: item.filename.split('/') } };
	});
	return paths;
}

export const getRootPath = () => {
	if(!muraIsInit) {
		Mura.init({
			rootpath:"http://localhost:8888",
			siteid:"default",
			processMarkup:false
		});
		muraIsInit = true;
	}

	return Mura.rootpath;
}

const MuraHelper = async (context) => {

	console.log("CONTEXT",context);
	let modules = [];

	if(context.res && !contextIsInit) {
		Mura.init({
			rootpath:"http://localhost:8888",
			siteid:"default",
			processMarkup:false,
			response:context.res,
			request:context.req
		});
		contextIsInit = true;
		muraIsInit = true;
	}
	else if(!muraIsInit) {
		Mura.init({
			rootpath:"http://localhost:8888",
			siteid:"default",
			processMarkup:false
		});
		muraIsInit = true;
	}


	//Don't rely on ready event for when to fire
	Mura.holdReady(true);


	const muraObject = await renderContent(context);
	const navigation = await getPrimaryNavData();
	const content = muraObject.getAll();

	if(content.displayregions && content.displayregions.primarycontent) {
		modules = content.displayregions.primarycontent.local.items.map((item) => {  
		return item;
	  });
	}

	Mura.holdReady(false);

	const props = {
		navigation,
		title: "in [name.js]",
		modules: modules,
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

	if(context.params && context.params.filename) {
		filename=context.params.filename.join('/');
	}
	else if(context.params && context.params.slug) {
		filename = context.params.slug;
	}
	else if(context.params && context.params.page) {
		filename = context.params.page;
	}

	return Mura.renderFilename(filename,query).then((rendered)=>{
		return rendered;
	},(rendered)=>{
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
			return rendered
		}
    })
}

async function getPrimaryNavData() {

	if(!muraIsInit) {
		Mura.init({
			rootpath:"http://localhost:8888",
			siteid:"default",
			processMarkup:false
		});		
	}

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

console.log("MIN: ",Mura.isInNode());

export default MuraHelper;
import Mura from 'mura.js';

let muraIsInit = false;

export const getMuraPaths = async(context) => {
	context = context === null ? {} : context;
	muraInit(context);

	const pathList = await getPrimaryNavData();

	const paths = pathList.map((item) => {
		return { params: { slug: item.filename.split('/') } };
	});
	return paths;
}

function muraInit(context) {
	console.log("MURA INIT: ", muraIsInit);

	if(muraIsInit)
		return;

	console.log("PATHS CONTEXT: ",context);

	Mura.init({
		rootpath:"http://localhost:8888",
		siteid:"default",
		processMarkup:false
	});
	muraIsInit = true;
}

const MuraFetch = async (context) => {
	muraInit(context);
	
	//Don't rely on ready event for when to fire
	Mura.holdReady(true);

	let modules = [];
	const muraObject = await renderContent(context);
	const navigation = await getPrimaryNavData();
	const content = muraObject.properties;

	if(content.displayregions && content.displayregions.primarycontent) {
		modules = content.displayregions.primarycontent.local.items.map((item) => {  
		return item;
	  });
	}


	Mura.holdReady(false);

	return {
		props: {
		  navigation,
		  title: "in [name.js]",
		  content: modules,
		  url: "http://localhost:8888//index.cfm/_api/json/v1/default//content",
		},
	};
}

function renderContent(context) {
	let query={};

//	console.log(context);

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

	return Mura.renderFilename(filename,query).then((rendered)=>{
//		console.log("FETCHED: ", rendered.properties.displayregions.primarycontent);

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

function getPrimaryNavData() {
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

export default MuraFetch;
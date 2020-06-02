import { useRouter } from 'next/router'
import Layout from '../components/MyLayout.js'
import Mura from 'mura.js'
import React, {useEffect} from 'react'

require('../mura.config');

function Index(props) {
    
    const {content,region} = props;
   // const router = useRouter()
    //const slug = router.query.slug || []

    //didMount
    useEffect(()=>{
        contentDidChange(content,region);
    },[
        content,
        region
    ]);

    let template = '..loading';
    let MuraJSPlaceholder="if(typeof Mura=='undefined'){window.queuedMuraCmds=[],window.queuedMuraPreInitCmds=[],window.mura=window.m=window.Mura=function(u){window.queuedMuraCmds.push(u)},window.Mura.preInit=function(u){window.queuedMuraPreInitCmds.push(u)};}";

    if(content && region){
        template=<Layout {...props}>
			    <script dangerouslySetInnerHTML={{__html: MuraJSPlaceholder}}></script>
                <div dangerouslySetInnerHTML={{__html: content.title}}></div>
                <div dangerouslySetInnerHTML={{__html: region.primarycontent}}></div>
                <div id="htmlqueues"></div>
			</Layout>
    }

  return (
    <div>
        {template}
    </div>
  )
}

export async function getServerSideProps(context) {
    //Initialize Mura to make api call

    Mura.init({
        rootpath:"http://localhost:8888",
        siteid:"default",
        processMarkup:false,
        response:context.res,
        request:context.req
    })

    //Don't rely on ready event for when to fire
    Mura.holdReady(true);

    function renderContent(context){

        let query={}
        if(context.browser){
            query=Mura.getQueryStringParams()
        } else if (context.query) {
            query=context.query
        }
        
        let filename='';
        if(context.params && context.params.filename){
            filename=context.params.filename.join('/');
        }

        //console.log(filename)
        
        return Mura.renderFilename(filename,query).then((rendered)=>{
            return rendered
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

    function getPrimaryNavData(){
        return Mura.getFeed('content')
            .where()
            .prop('parentid').isEQ('00000000000000000000000000000000001')
            .sort('orderno')
            .getQuery()
            .then(collection=>{
                let tempArray=collection.getAll().items;
                tempArray.unshift({url:"/",menutitle:"Home",title:"Home",filename:"",contentid:"00000000000000000000000000000000001"});
                return tempArray;
            });
    }

    const content=await renderContent(context)
    const primaryNavData=await getPrimaryNavData()
    const primarycontent=await content.renderDisplayRegion('primarycontent')
   
    return { props: {
            content:content.getAll(),
            primaryNavData:primaryNavData,
            region:{
                primarycontent:primarycontent
            }
        }
    }
}

function contentDidChange(_content){

    const content=Mura.getEntity('content').set(_content)

    if(content.get('redirect')){
        location.href=content.get('redirect')
        return;
    }

    //The setTimeout was used to prevent mysterious double processing of previous html in element
    setTimeout(
        ()=>{

            Mura('#htmlqueues').html(content.get('htmlheadqueue') + content.get('htmlfootqueue'))
            
            Mura.init(Mura.extend({queueObjects:false,content:content}))
            Mura.holdReady(false);

            Mura.loader()
            .loadcss(Mura.rootpath + '/core/modules/v1/core_assets/css/mura.10.min.css')
            .loadcss(Mura.rootpath + '/core/modules/v1/core_assets/css/mura.10.skin.css');
        },
        1
    )

}


export default Index;

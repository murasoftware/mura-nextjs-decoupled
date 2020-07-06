import React,{ useContext, useEffect } from "react";
import MuraStyles from "../MuraStyles";
import Mura from 'mura.js'

const MainLayout = (props) => {
    const {content} = props;

    Mura.moduleStyleData=props.moduleStyleData;

    useEffect(()=>{
        contentDidChange(content);
    })

    return (
    <div>
        {props.children}
        <MuraStyles {...props}></MuraStyles>
    </div>
    )
}

function contentDidChange(_content){
    const content=Mura.getEntity('content').set(_content);

    if(content.get('redirect')){
        location.href=content.get('redirect')
        return;
    }

    if(typeof Mura.deInitLayoutManager != 'undefined'){
        //Mura.deInitLayoutManager();
    }

    //Ensure edit classes are removed
    Mura('html,body').attr('class','');
    
    setTimeout(
        ()=>{
           // console.log("timeout",_content);
            const htmlQueueContainer=Mura('#htmlqueues');
            if(htmlQueueContainer.length){
                Mura('#htmlqueues').html(content.get('htmlheadqueue') + content.get('htmlfootqueue'));
            }
           
            Mura.init(Mura.extend({queueObjects:false,content:content}));
            Mura.holdReady(false)
        
            /*
            if(!htmlQueueContainer.length){
                Mura.loader().loadjs(Mura.rootpath + "/core/modules/v1/core_assets/js/variation.js?siteid=" + Mura.siteid)
            }
            */
        },
        5
    )


}



export default MainLayout
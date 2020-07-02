import React,{ useContext, useEffect } from "react";
import Mura from 'mura.js'

const MainLayout = (props) => {
    const {content} = props;

    useEffect(()=>{
        contentDidChange(content);
    })

    return (
    <div>
        {props.children}
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
        Mura.deInitLayoutManager();
    }

    setTimeout(
        ()=>{
           // console.log("timeout",_content);
            const htmlQueueContainer=Mura('#htmlqueues');
            if(htmlQueueContainer.length){
                Mura('#htmlqueues').html(content.get('htmlheadqueue') + content.get('htmlfootqueue'));
            }
            Mura.init(Mura.extend({queueObjects:false,content:content}));
            Mura.holdReady(false)
        },
        5
    )


}



export default MainLayout
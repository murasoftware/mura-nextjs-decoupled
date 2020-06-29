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
        <div id="htmlqueues"></div>
    </div>
    )
}

function contentDidChange(_content){
    const content=Mura.getEntity('content').set(_content);

    //The setTimeout was used to prevent mysterious double processing of previous html in element
    setTimeout(
        ()=>{
//            Mura('#htmlqueues').html(content.get('htmlheadqueue') + content.get('htmlfootqueue'));
            
            Mura.init(Mura.extend({queueObjects:false,content:content}));
            Mura.holdReady(false)
        },
        5
    )

}



export default MainLayout
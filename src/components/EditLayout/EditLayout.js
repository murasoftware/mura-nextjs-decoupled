import React,{ useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import Mura from "mura.js";

const EditLayout = (props) => {
    const [isEditMode, setIsEditMode]  = useContext(GlobalContext);
    const {content} = props;

    useEffect(()=>{
        setIsEditMode(true);
        contentDidChange(content);
    },[setIsEditMode])

    return (
        <div>
            {props.children}
            <div id="htmlqueues"></div>
        </div>
    )
}

function contentDidChange(_content){
    const content=Mura.getEntity('content').set(_content);

    if(content.get('redirect')){
        location.href=content.get('redirect')
        return;
    }

    //The setTimeout was used to prevent mysterious double processing of previous html in element
    setTimeout(
        ()=>{

           // console.log("timeout",_content);

            Mura('#htmlqueues').html(content.get('htmlheadqueue') + content.get('htmlfootqueue'));
            Mura.init(Mura.extend({queueObjects:false,content:content}));
            Mura.holdReady(false)
        },
        5
    )

}


export default EditLayout;
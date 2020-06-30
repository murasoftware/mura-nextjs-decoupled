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
}


export default EditLayout;
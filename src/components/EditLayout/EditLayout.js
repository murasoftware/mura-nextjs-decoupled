import React,{ useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
const EditLayout = (props) => {
    const [isEditMode, setIsEditMode]  = useContext(GlobalContext);

    useEffect(()=>{
        setIsEditMode(true);
    },[setIsEditMode])
    return (
        <div>
            {props.children}
            <div id="htmlqueues"></div>
        </div>
    )
}
export default EditLayout;
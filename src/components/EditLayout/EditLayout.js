
import React,{ useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";

const EditLayout = (props) => {
    const [isEditMode, setIsEditMode]  = useContext(GlobalContext);
    
    useEffect(()=>{
        setIsEditMode(true);
    },[setIsEditMode])
    
    return <div>
    <h1>This is your edit layout</h1>
        {props.children}
    </div>
}

export default EditLayout;
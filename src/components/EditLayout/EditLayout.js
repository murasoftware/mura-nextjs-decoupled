
import { useContext } from "react";
import GlobalContext from "../GlobalContext";

const EditLayout = (props) => {
    const [isEditMode, setIsEditMode]  = useContext(GlobalContext);
    setIsEditMode(true);
    return (
    <div className="mura-editable">
        <h1>This is your edit layout</h1>
        {props.children}
    </div>
    )
}

export default EditLayout;
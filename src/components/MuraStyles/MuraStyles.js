function MuraStyles(props){
    const {dynamicCSS} = props;

//    console.log("DIN: ",dynamicCSS);

    if(typeof dynamicCSS != 'undefined' && Array.isArray(dynamicCSS)){
        return (
        <div id="mura-style-container">
            {dynamicCSS.map((rules) => {
                return (
                    <styles jsx>{
                        rules.cssRules.map((style) => {
                            return(style)
                        })
                    }</styles>
                )
            })
            }
        </div>
        )
    } else {
        console.log("DYN IS NOT ARRAY: ");
        return  (<div id="mura-style-container"/>)
    }
}

export default MuraStyles;
function MuraStyles(props){
    const {dynamicCSS} = props;
        
    //console.log("DIN: ",dynamicCSS);
   
    if(typeof dynamicCSS != 'undefined' && Array.isArray(dynamicCSS)){
        return (
        <div>   
            {dynamicCSS.map((rules) => {
                return (
                    <style id={rules.id}  key={rules.id} dangerouslySetInnerHTML={{__html:rules.cssRules.join('\n')}}></style>
                )
            })
            }
        </div>
        )
    } else {
        //console.log("DYN IS NOT ARRAY: ");
        return  (<div></div>)
    }
}

export default MuraStyles;
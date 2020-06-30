function MuraStyles(dyncss){
   
    if(typeof dyncss != 'undefined' && dyncss){
        return (<div id="mura-style-container">
            
            { Object.keys(dyncss).forEach((key) => {
                let styles=dyncss[key];
                return (<style id={key} key={key}>
                    {styles.cssRules.map((style)=>{
                        return (style)
                    })}</style>)

            })}
        </div>);
    } else {
        return  (<div id="mura-style-container"/>);
    }
}

export default MuraStyles;
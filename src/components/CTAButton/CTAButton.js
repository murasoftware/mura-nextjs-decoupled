import React from 'react';

function CTAButton({buttontext,buttoncolor,buttonsize,buttonlink,buttontarget,buttonblock}) {

  var btnclass = `btn btn-${buttoncolor||'primary'}`;
  if (buttonsize != 'md'){
    btnclass = btnclass + ` btn-${buttonsize}`;
  }
  if (buttonblock){
    btnclass = btnclass + ` btn-block`;
  }

  return (
    <>
        <a href={buttonlink||'https://www.murasoftware.com'} target={buttontarget||'_self'} className={btnclass}>{buttontext || 'Press Me'}</a>
    </>
  );
}

export default CTAButton;
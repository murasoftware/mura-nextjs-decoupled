import React from 'react';
import Link from 'next/link';

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
        <Link href={buttonlink||'https://www.murasoftware.com'} passHref>
          <a target={buttontarget||'_self'} className={btnclass}>{buttontext || 'Press Me'}</a>
        </Link>
    </>
  );
}

export default CTAButton;
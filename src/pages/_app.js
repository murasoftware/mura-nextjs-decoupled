
import React, { useState } from "react";
import GlobalContext from '../components/GlobalContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MuraApp({ Component, pageProps }) {
  const [isEditMode, setIsEditMode] = useState(false);
  
return <GlobalContext.Provider value={[isEditMode, setIsEditMode]}>
              <Component {...pageProps} />
          </GlobalContext.Provider>
}

import GlobalContext from '../components/GlobalContext'
import React, { useState } from "react";

export default function MuraApp({ Component, pageProps }) {
  const [isEditMode, setIsEditMode] = useState(false);
  
return <GlobalContext.Provider value={[isEditMode, setIsEditMode]}>
              <Component {...pageProps} />
          </GlobalContext.Provider>
}
import React, { useContext, useState } from 'react'
import Meta from './Meta'
import Footer from './Footer'


export const langs = {
  en: 'en',
  de: 'de'
}

export const LangContext = React.createContext({
  lang: undefined,
  setLang: async (lang) => null
})

export const useLang = () => useContext(LangContext)

export const Layout = ({children}) => {
  const [lang, setLang] = useState(langs.en)
  
  return (
    <LangContext.Provider value={{lang, setLang}}>
      <Meta />
      {children}
      <Footer />
    </LangContext.Provider>
  )
}
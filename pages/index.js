import { useEffect, useState } from 'react'
import { langs, useLang } from '../components/Layout'
import Menu from '../components/Menu'
import Buttons from '../components/Buttons'
import LandingOne from '../components/LandingOne'
import LandingTwo from '../components/LandingTwo'
import Funding from '../components/Funding'


const Home = () => {

  const {lang, setLang} = useLang()
  const [toggle, setToggle] = useState(false)

  const toggler = () => setToggle(prev => !prev)
  const langToggler = () => setLang(lang === langs.en ? langs.de : langs.en)

  const [subtitles, setSubtitles] = useState({
    title: '',
    opencall: '',
    dates: '',
    restore: '',
    documentation: ''
  })
  
  const words = {
    en: {
      title:'INTERDISCIPLINARY PERFORMANCES IN CONTEXT',
      opencall: 'Open Call ➝',
      dates: 'Bremen 10 - 18 June 2022',
      restore: ['RESTORE_ is a series of projects and performances through the temporary occupation of empty stores in the city of Bremen.'],
      documentation: 'Documentation ➝'
    },
    de: {
      title:'INTERDISZIPLINÄRE PERFORMANCES IM KONTEXT',
      opencall: 'Open Call ➝',
      dates: 'Bremen 10 - 18 Juni 2022',
      restore: ['RESTORE_ ist eine Projekt- und Performanceserie durch die temporäre Besetzung leerstehender Geschäfte in der Stadt Bremen.'],
      documentation: 'Dokumentation ➝'
    }
  }

  const handleSubtitles = () => {
    if (lang === langs.en) {
      setSubtitles({...subtitles, ...words.en})
    } else {
      setSubtitles({...subtitles, ...words.de})
    }
  }

  useEffect(() => {
    setSubtitles({...words.en})
    handleSubtitles()
  }, [lang])


  return (
    <div style={{overflowX: 'hidden'}} >

      {toggle && <Menu setToggle={toggler} lang={lang} />}
      <Buttons lang={lang} langs={langs} setLang={langToggler} setToggle={toggler} />

      <LandingOne subtitles={subtitles}/>
      <LandingTwo subtitles={subtitles}/>

      <Funding />

    </div>
  )
}

export default Home
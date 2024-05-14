import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { langs, useLang } from '../components/Layout'
import Docu from '../components/Docu'
import Menu from '../components/Menu'
import Buttons from '../components/Buttons'
import Funding from '../components/Funding'

import * as Icon from 'react-feather'
import * as buttonStyles from '../styles/Buttons.module.css'


const Mapbox = dynamic(() => import('../components/Mapbox'), {
  loading: () => "",
  ssr: false
})


const Documentation = () => {

  const router = useRouter()
  const {lang, setLang} = useLang()
  const [toggle, setToggle] = useState(false)

  const toggler = () => setToggle(prev => !prev)
  const langToggler = () => {
    setLang(lang === langs.en ? langs.de : langs.en )
  }

  const [groupID, setGroupID] = useState('')
  const [content, setContent] = useState('')
  const [groupContent, setGroupContent] = useState('')

  const [pageEnd, setPageEnd] = useState(false)

  const iconProps = {
    color: '#eee',
    size: 30,
    strokeWidth: 1.5
  }

  const messageText = {
    en: 'Please select a location',
    de: 'Bitte wählen Sie einen Standort'
  }

  const messageStyle = {
    fontSize: '1.4em',
    fontFamily: 'var(--space-font)',
    fontWeight: '300'
  }

  // these two styles are important
  const mapContainerStyle = {
    height: '100vh',
    width: '100vw',
    background: '#000'
  }
  const docuContainerStyle = {
    color: '#eee',
    minHeight: 'calc(100vh - 60px)',
    background: '#000',
    backgroundImage: 'radial-gradient(#464646 1px, transparent 0)',
    backgroundSize: '38px 38px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const goUpButton = {
    display: pageEnd ? 'flex' : 'none'
  }

  const setSelectedDocu = (id) => {
    setGroupID(id)
    router.push(`${router.pathname}#${id}`)
  }

  const handleGoUp = () => window.scrollTo(0, 0)

  const handleScroll = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1000) {
      setPageEnd(true)
    } else {
      setPageEnd(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/documentation')
      const data = await response.json()
      setContent(data)
      const grpContent = data.filter(e => e.ID === groupID)[0]
      setGroupContent(grpContent)
    }
    fetchData()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lang, groupID])

  
  return (
    <div style={{overflowX: 'hidden'}}>

      {toggle && <Menu setToggle={toggler} lang={lang} />}

      <Buttons lang={lang} langs={langs} setLang={langToggler} setToggle={toggler} />
     
      <button style={goUpButton} className={buttonStyles.goUpBut} onClick={handleGoUp}>
        <Icon.MapPin {...iconProps}/>
      </button>

      <section style={mapContainerStyle} >
        <Mapbox mapData={content} setSelectedDocu={setSelectedDocu} />
      </section>

      <section id={groupID} style={docuContainerStyle}>
        {groupContent ?
          <Docu groupContent={groupContent} /> :
          <p style={messageStyle}>{lang === langs.en ? messageText.en : messageText.de}</p>
        }
      </section>

      <Funding />
      
    </div>
  )
}
    
export default Documentation
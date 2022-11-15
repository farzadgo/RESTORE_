import { useEffect, useState } from 'react'
import { debounce } from '../config/helpers'

import { langs, useLang } from '../components/Layout'
import Menu from '../components/Menu'
import Buttons from '../components/Buttons'
import Paragraph from '../components/Paragraph'

import * as styles from '../styles/About.module.css'


const About = () => {

  const {lang, setLang} = useLang()
  const [toggle, setToggle] = useState(false)

  const toggler = () => setToggle(prev => !prev)
  const langToggler = () => setLang(lang === langs.en ? langs.de : langs.en)

  const [width, setWidth] = useState(900)
  const [about, setAbout] = useState('')

  const handleResize = debounce(() => {
    setWidth(window.innerWidth)
  }, 1000)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/about')
      const data = await response.json()
      const content = await data.filter(e => e.lang === lang)[0].data
      setAbout(content.filter(e => e.ID === 'about')[0].data)
    }
    fetchData()

    setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [lang])

  return (
    <div style={{overflowX: 'hidden'}}>

      {toggle && <Menu setToggle={toggler} lang={lang}/>}

      <Buttons lang={lang} langs={langs} setLang={langToggler} setToggle={toggler}/>

      <section className={styles.aboutParags}>
        {about && about.map(e => <Paragraph content={e} body={e.BODY} width={width} key={e.ID}/>)}
      </section>

    </div>
  )
}
 
export default About
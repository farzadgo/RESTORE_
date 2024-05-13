import { useEffect, useState } from 'react'
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

  const [about, setAbout] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/about')
      const data = await response.json()
      const content = await data.filter(e => e.lang === lang)[0].data
      setAbout(content.filter(e => e.ID === 'about')[0].data)
    }
    fetchData()
  
  }, [lang])

  return (
    <div style={{overflowX: 'hidden'}}>

      {toggle && <Menu setToggle={toggler} lang={lang}/>}

      <Buttons lang={lang} langs={langs} setLang={langToggler} setToggle={toggler}/>

      <section className={styles.aboutParags}>
        {about && about.map(e => <Paragraph content={e} body={e.BODY} key={e.ID}/>)}
      </section>

    </div>
  )
}
 
export default About
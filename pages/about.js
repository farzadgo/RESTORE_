import { useEffect, useState } from 'react'
import { langs, useLang } from '../components/Layout'
import { useRouter } from 'next/router'
import { debounce } from '../config/helpers'
import Menu from '../components/Menu'
import * as Icon from 'react-feather'
import * as styles from '../styles/About.module.css'

const About = () => {

  const router = useRouter()
  const {lang, setLang} = useLang()
  const [about, setAbout] = useState('')
  const [width, setWidth] = useState(900)

  const [toggle, setToggle] = useState(false)
  const toggler = () => setToggle(prev => !prev)

  const toggleLang = () => {
    setLang(lang === langs.en ? langs.de : langs.en )
  }

  const backer = () => router.push('/')

  const handleResize = debounce(() => {
    setWidth(window.innerWidth)
  }, 1000)

  const iconProps = {
    color: '#eee',
    size: 36,
    strokeWidth: 1.5
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api')
      const data = await response.json()
      const cont = await data.filter(e => e.lang === lang)[0].data
      setAbout(cont.filter(e => e.group === 'about')[0].data)
    }
    fetchData()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [lang])

  return (
    <div className={styles.about}>

    {toggle && <Menu setToggle={toggler} lang={lang}/>}

      <div className={styles.buttons}>
        <button onClick={toggleLang} className={styles.langbut}>
          {lang === langs.en ? 'DE' : 'EN'}
        </button>
        <button onClick={backer} className={styles.backbut}>
          <Icon.ArrowLeft {...iconProps}/>
        </button>
        <button onClick={toggler} className={styles.menubut}> ☰ </button>
      </div>

      {about && about.map(e => <Individual key={e.id} content={e} width={width}/>)}

    </div>
  )
}
 
export default About



const Individual = ({ content, width }) => {

  // const paragstyle = {
  //   width: width * 0.9
  // }

  // console.log(content);

  const createMarkup = (string) => {
    return {__html: string}
  }

  return (
    <div className={styles.individual} >
      {content.title && <h3>{content.title}</h3>}
      {typeof content.body && <p dangerouslySetInnerHTML={createMarkup(content.body)} /> }
    </div>
  )
}
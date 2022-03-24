import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Menu from '../components/Menu'
import { debounce } from '../config/helpers'
import Paragraph from '../components/Paragraph'
import { useRouter } from 'next/router'

// import { server } from '../config'
// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api`)
//   const data = await res.json()
//   return {
//     props: { openCall: data }
//   }
// }

const Home = () => {
  
  const router = useRouter()
  const [toggle, setToggle] = useState(false)
  const toggler = () => setToggle(prev => !prev)
  const [width, setWidth] = useState(900)

  const [content, setContent] = useState('')
  const [lang, setLang] = useState('en')

  const [intro, setIntro] = useState('')
  const [whatwho, setWhatwho] = useState('')
  const [rest, setRest] = useState('')
  const [about, setAbout] = useState('')
  // console.log(intro)

  const [activeParag, setActiveParag] = useState('intro')
  const setActive = (group) => {
    setActiveParag(group)
    router.push(`/#${group}`)
  }

  const [subtitles, setSubtitles] = useState({
    title: '',
    more: '',
    dates: '',
    call: ''
  })
  
  const words = {
    en: {
      title:'INTERDISCIPLINARY PERFORMANCES IN CONTEXT',
      more: 'Read More',
      dates: 'Bremen 10 - 18 June 2022',
      call: 'Deadline: 21 April 2022'
    },
    de: {
      title:'INTERDISZIPLINÄRE PERFORMANCES IM KONTEXT',
      more: 'Mehr lesen',
      dates: 'Bremen 10 - 18 Juni 2022',
      call: 'Bewerbungsfrist: 21 April 2022'
    }
  }

  const handleSubtitles = () => {
    if (lang === 'en') {
      setSubtitles({...subtitles, ...words.en})
    } else {
      setSubtitles({...subtitles, ...words.de})
    }
  }

  const handleLang = () => {
    if (lang === 'en') {
      setLang('de')
    } else {
      setLang('en')
    }
  }

  const handleResize = debounce(() => {
    setWidth(window.innerWidth)
  }, 1000)
  // console.log(width)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api')
      const data = await response.json()
      const cont = await data.filter(e => e.lang === lang)[0].data
      setContent(cont)
      setIntro(cont.filter(e => e.group === 'intro'))
      setWhatwho(cont.filter(e => e.group === 'what' || e.group === 'who'))
      setRest(cont.filter(e => e.group === 'when' || e.group === 'offer' || e.group === 'apply'))
      setAbout(cont.filter(e => e.group === 'we'))
    }
    fetchData()

    setSubtitles({...words.en})
    handleSubtitles()

    setWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [lang])

  return (
    <div className={styles.home} >

      {toggle && <Menu setToggle={toggler} content={content} lang={lang} setActive={setActive}/>}

      <button onClick={handleLang} className={styles.langbut}>{lang === 'de' ? 'EN' : 'DE'}</button>

      <button onClick={toggler} className={styles.menubut}> ☰ </button>

      <section className={styles.landing} id='landing'>
        <div className={styles.landingprime}>
          <h1>RESTORE_</h1>
          <h2> {subtitles.title} </h2>
          <p> {subtitles.dates} </p>
          <a href='#more'> {subtitles.more} ↓ </a>
        </div>
        <div className={styles.scroller}>
          <div className={styles.marquee}>
            <p>
              OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! &nbsp;
            </p>
            <p>
              OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! &nbsp;
            </p>
          </div>
        </div>
      </section>

      {/* USEREF here to spread images */}
      <section className={styles.more} id='more'>

        <div className={styles.moretitle}>
          <h3>{subtitles.call}</h3>
        </div>

        <div>
          {intro && intro.map(e => <Paragraph key={e.id} content={e} width={width} activeParag={activeParag} setActive={setActive}/>)}
        </div>

        <div>
          {whatwho && whatwho.map(e => <Paragraph key={e.id} content={e} width={width} activeParag={activeParag} setActive={setActive}/>)}
        </div>

        <div>
          {rest && rest.map(e => <Paragraph  key={e.id} content={e} width={width} activeParag={activeParag} setActive={setActive}/>)}
        </div>

        <div className={styles.hacersitio}>
          {about && about.map(e => <Paragraph key={e.id} content={e} width={width} activeParag={activeParag} setActive={setActive}/>)}
        </div>

      </section>

    </div>
  )
}

export default Home
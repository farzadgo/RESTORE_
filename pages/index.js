import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Menu from '../components/Menu'
// import Spinner from '../components/Spinner'
import Logos from '../components/Logos'
import { debounce } from '../config/helpers'
import Paragraph from '../components/Paragraph'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

// import { server } from '../config'
// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api`)
//   const data = await res.json()
//   return {
//     props: { openCall: data }
//   }
// }

const Model = dynamic(() => import('../components/Model'), {
  ssr: false,
  // loading: function() {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   )
  // }
})

const Home = () => {
  
  const router = useRouter()
  const [toggle, setToggle] = useState(false)
  const toggler = () => setToggle(prev => !prev)
  const [width, setWidth] = useState(900)

  const [content, setContent] = useState('')
  const [lang, setLang] = useState('en')

  const [activeParag, setActiveParag] = useState('intro')
  const setActive = (group) => {
    setActiveParag(group)
    router.push(`/#${group}`)
  }

  const [subtitles, setSubtitles] = useState({
    title: '',
    readmore: '',
    dates: '',
    deadline: ''
  })
  
  const words = {
    en: {
      title:'INTERDISCIPLINARY PERFORMANCES IN CONTEXT',
      readmore: 'Read More',
      dates: 'Bremen 10 - 18 June 2022',
      deadline: 'Deadline: 21 April 2022'
    },
    de: {
      title:'INTERDISZIPLINÄRE PERFORMANCES IM KONTEXT',
      readmore: 'Mehr lesen',
      dates: 'Bremen 10 - 18 Juni 2022',
      deadline: 'Bewerbungsfrist: 21 April 2022'
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api')
      const data = await response.json()
      const cont = await data.filter(e => e.lang === lang)[0].data
      setContent(cont)
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
          <a href='#call'> {subtitles.readmore} ↓ </a>
        </div>

        <div className={styles.scroller}>
          <div className={styles.marquee}>
            <p>
              OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL !
              OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL !
              &nbsp;
            </p>
            <p>
              OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL !
              OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL !
              &nbsp;
            </p>
          </div>
        </div>

        <Model />

      </section>

      <section className={styles.call} id='call'>
        <div className={styles.calltitle}>
          <h3>{subtitles.deadline}</h3>
        </div>
        <div className={styles.callparags}>
          {content && content.map(e => <Paragraph key={e.id} content={e} width={width} activeParag={activeParag} setActive={setActive}/>)}
        </div>
      </section>

      <Logos />

    </div>
  )
}

export default Home
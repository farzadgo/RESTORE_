import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Menu from '../components/Menu'
import { debounce } from '../config/helpers'

// import { server } from '../config'
// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api`)
//   const data = await res.json()
//   return {
//     props: { openCall: data }
//   }
// }

const Home = () => {
  
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
      call: 'OPEN CALL (Deadline: 21 April 2022)'
    },
    de: {
      title:'INTERDISZIPLINÄRE PERFORMANCES IM KONTEXT',
      more: 'Mehr lesen',
      dates: 'Bremen 10 - 18 Juni 2022',
      call: 'OPEN CALL (Bewerbungsfrist: 21 April 2022)'
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

      {toggle && <Menu setToggle={toggler} content={content} lang={lang} />}

      <button onClick={handleLang} className={styles.langbut}>{lang === 'de' ? 'EN' : 'DE'}</button>

      <button onClick={toggler} className={styles.menubut}> ☰ </button>

      <section className={styles.landing} id='landing'>
        <div className={styles.landingprime}>
          <h1>RESTORE_</h1>
          <h2> {subtitles.title} </h2>
          <p> {subtitles.dates} </p>
          <a href='#more'> {subtitles.more} ↓ </a>
        </div>
      </section>

      <section className={styles.more} id='more'>

        <div className={styles.moretitle}>
          <h3>{subtitles.call}</h3>
        </div>

        <div>
          {intro && intro.map(e => <Parag content={e} key={e.id} width={width}/>)}
        </div>

        <div>
          {whatwho && whatwho.map(e => <Parag content={e} key={e.id} width={width}/>)}
        </div>

        <div>
          {rest && rest.map(e => <Parag content={e} key={e.id} width={width}/>)}
        </div>

        <div className={styles.hacersitio}>
          {about && about.map(e => <Parag content={e} key={e.id} width={width}/>)}
        </div>

      </section>

    </div>
  )
}

export default Home



const Parag = ({ content, width }) => {

  const [cardWidth, setCardWidth] = useState('')
  const [position, setPosition] = useState('')

  const paragStyle = {
    width: cardWidth,
    left: position
  }  

  useEffect(() => {
    let offset
    if (width > 1700) {
      offset = width * 0.5
    } else if (width > 1300 && width < 1699) {
      offset = width * 0.4
    } else if (width > 900 && width < 1299) {
      offset = width * 0.3
    } else {
      offset = 0
    }
    setCardWidth((width - offset) - 15)
    setPosition((Math.random() * offset))

    // if (width < 600) {
    //   setCardWidth('100%')
    //   setPosition('auto')
    // }
  
    // return () => {
    // }
  }, [width])
  

  
  return (
    <div className={styles.parag} style={paragStyle} id={content.group}>

      {content.title && <h3>{content.title}</h3>}

      {content.body && content.body.map(e => {
        let idone = Math.random().toString(36).substring(2, 15)
        if (typeof e === 'string') {
          return <p className={styles.paragprime} key={idone}>{e}</p>
        } else {
          return <ul className={styles.paraglist} key={idone}>{e.map(p => {
            let idtwo = Math.random().toString(36).substring(2, 15)
            if (typeof p === 'string') {
              return <li key={idtwo}>{p}</li>
            } else {
              return <ul key={idtwo}>{p.map((e, i) => <li key={i}>{e}</li>)}</ul>
            }
          })}</ul>
        }
      })}

    </div>
  )
}
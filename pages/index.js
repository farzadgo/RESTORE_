import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
// import { server } from '../config'
import Menu from '../components/Menu'


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

  const [content, setContent] = useState('')
  const [lang, setLang] = useState('en')
  const [intro, setIntro] = useState('')
  const [whatwho, setWhatwho] = useState('')
  const [rest, setRest] = useState('')
  const [about, setAbout] = useState('')

  const [subtitles, setSubtitles] = useState({
    title: '',
    more: '',
    dates: '',
    call: ''
  })

  const btnLang = lang === 'de' ? 'EN' : 'DE'
  
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

    // return () => {
    //   console.log('home unmounted')
    // }
  }, [lang])

  return (
    <div className={styles.home} >

      {toggle && <Menu setToggle={toggler} content={content} lang={lang} />}

      <button onClick={handleLang} className={styles.langbut}>{btnLang}</button>

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

        <div className={styles.moreone}>
          {intro && intro.map(e => <Parag content={e} key={e.id}/>)}
        </div>

        <div className={styles.moretwo}>
          {whatwho && whatwho.map(e => <Parag content={e} key={e.id}/>)}
        </div>

        <div className={styles.morethree}>
          {rest && rest.map(e => <Parag content={e} key={e.id}/>)}
        </div>

        <div className={styles.morefour}>
          {about && about.map(e => <Parag content={e} key={e.id}/>)}
        </div>

      </section>

    </div>
  )
}

export default Home



const Parag = ({ content }) => {
  return (
    <div className={styles.parag} id={content.group}>
      {content.title && <h3>{content.title}</h3>}
      {content.body.map(e => {
        let nid = Math.random().toString(36).substring(2, 15)
        if (typeof e === 'string') {
          return <p key={nid}>{e}</p>
        } else {
          return <ul key={nid}>{e.map(p => {
            let mid = Math.random().toString(36).substring(2, 15)
            if (typeof p === 'string') {
              return <li key={mid}>{p}</li>
            } else {
              return <ul key={mid}>{p.map((e, i) => <li key={i}>{e}</li>)}</ul>
            }
          })}</ul>
        }
      })}
    </div>
  )
}
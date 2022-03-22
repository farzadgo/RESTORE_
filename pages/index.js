import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { server } from '../config'
import Menu from '../components/Menu'


export const getStaticProps = async () => {
  const res = await fetch(`${server}/api`)
  const data = await res.json()
  return {
    props: { openCall: data }
  }
}


const Home = ({ openCall }) => {  
  
  const [toggle, setToggle] = useState(false)
  const toggler = () => setToggle(prev => !prev);
  
  const [content, setContent] = useState('')
  const [lang, setLang] = useState('en')
  const [intro, setIntro] = useState('')
  const [whatwho, setWhatwho] = useState('')
  const [rest, setRest] = useState('')
  const [about, setAbout] = useState('')
  // console.log(content)

  const words = {
    en: {
      title:'INTERDISCIPLINARY PERFORMANCES IN CONTEXT',
      more: 'Read More',
      date: 'Bremen 10 - 18 June 2022',
      call: 'OPEN CALL (Deadline: 21 April 2022)'
    },
    de: {
      title:'INTERDISZIPLINÄRE PERFORMANCES IM KONTEXT',
      more: 'Mehr lesen',
      date: 'Bremen 10 - 18 Juni 2022',
      call: 'OPEN CALL (Bewerbungsfrist: 21 April 2022)'
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
    const langData = openCall.filter(e => e.lang === lang)
    if (langData) {
      let content = langData[0].data
      setContent(content)
      setIntro(content.filter(e => e.group === 'intro'))
      setWhatwho(content.filter(e => e.group === 'what' || e.group === 'who'))
      setRest(content.filter(e => e.group === 'when' || e.group === 'offer' || e.group === 'apply'))
      setAbout(content.filter(e => e.group === 'we'))
    }

    return () => {
      console.log('home unmounted')
    }
  }, [lang])

  return (
    <div className={styles.home} >

      {toggle && <Menu setToggle={toggler} content={content}/>}

      <button onClick={handleLang} className={styles.langbut}>{lang}</button>

      <button onClick={toggler} className={styles.menubut}> ☰ </button>

      <section className={styles.landing} id='landing'>
        <div className={styles.landingprime}>
          <h1>RESTORE_</h1>
          <h2>
            {lang === 'en' ? words.en.title : words.de.title}
          </h2>
          <p>{lang === 'en' ? words.en.date : words.de.date}</p>
          <a href='#more'>
            {lang === 'en' ? words.en.more : words.de.more} ↓
          </a>
        </div>
      </section>

      <section className={styles.more} id='more'>

        <div className={styles.moretitle}>
          <h3>{lang === 'en' ? words.en.call : words.de.call}</h3>
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
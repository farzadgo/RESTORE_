import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import ReactPlayer from 'react-player'

import useWindowSize from '../hooks/useWindowSize'
import modelimage from '../public/glass-body.png'

import { langs, useLang } from '../components/Layout'
import Menu from '../components/Menu'
import Buttons from '../components/Buttons'
import Scroller from '../components/Scroller'
import Funding from '../components/Funding'
import Paragraph from '../components/Paragraph'

import styles from '../styles/Home.module.css'


const Model = dynamic(() => import('../components/Model'), {
  ssr: false
})

const Home = () => {

  const {lang, setLang} = useLang()
  const [toggle, setToggle] = useState(false)
  const {desktop} = useWindowSize()

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

  const ModelImage = () => {
    return (
      <div style={{padding: '10px'}}>
        <Image src={modelimage} width={390} height={390} />
      </div>
    )
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


  const videoContainerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const videoCallBack = (entries) => {
    const [entry] = entries
    setIsPlaying(entry.isIntersecting)
  }
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.75
  }


  useEffect(() => {
    const observer = new IntersectionObserver(videoCallBack, options)
    if (videoContainerRef.current) observer.observe(videoContainerRef.current)
    return () => {
      if (videoContainerRef.current) observer.unobserve(videoContainerRef.current)
    }
  }, [videoContainerRef, options])


  return (
    <div style={{overflowX: 'hidden'}} >

      {toggle && <Menu setToggle={toggler} lang={lang} />}

      <Buttons lang={lang} langs={langs} setLang={langToggler} setToggle={toggler} />

      <section className={styles.landing} id='landing'>
        <div data-test="landing-titles" className={styles.landingtitles}>
          <h1>RESTORE_</h1>
          <h2> {subtitles.title} </h2>
          <p> {subtitles.dates} </p>
          <Link href='/opencall'>
            <a>{subtitles.opencall}</a>
          </Link>
        </div>
        <Scroller />
        {desktop ? <Model /> : <ModelImage />}
      </section>

      <section className={styles.intro}>
        <div className={styles.videoContainer} ref={videoContainerRef}>
          <ReactPlayer
            url='https://res.cloudinary.com/dd3tumnu6/video/upload/v1668796584/RESTORE_/restore_intro_short_hle1c4.mp4'
            width='100%'
            height='100%'
            // controls={true}
            playing={isPlaying}
            muted={true}
            loop={true}
            // onReady={e => console.log(e)}
          />
        </div>
        <Paragraph content={''} body={subtitles.restore}/>
        <Link href='/documentation'>
          <a>{subtitles.documentation}</a>
        </Link>
      </section>

      <Funding />

    </div>
  )
}

export default Home
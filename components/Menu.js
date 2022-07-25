import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { langs, useLang } from '../components/Layout'
import * as Icon from 'react-feather'
import * as styles from '../styles/Menu.module.css'
import { contact, links } from '../config/sitedata'

const Menu = ({ setToggle, opencall, setActive }) => {

  const { lang } = useLang()

  const [dlInfo, setDlInfo] = useState({ })

  const path = useRouter().pathname
  // console.log(path)

  const dlDaten = {
    en: {
      callTitle:'Open Call (EN)',
      callLink: links.openEN,
      formTitle: 'Application Form',
      formLink: links.formEN
    },
    de: {
      callTitle:'Open Call (DE)',
      callLink: links.openDE,
      formTitle: 'Anmeldeformular',
      formLink: links.formDE
    }
  }

  const iconProps = {
    color: '#000',
    size: 36,
    strokeWidth: 1.5
  }

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [])

  const handleMenuItem = (group) => {
    setToggle()
    setActive(group)
  }

  const CloseMenu = ({ setToggle }) => {
    const iconProps = {
      color: '#000',
      size: 48,
      strokeWidth: 1
    }
    return (
      <div className={styles.close}>
        <button className={styles.closebtn} onClick={setToggle}>
          <Icon.X {...iconProps}/>
        </button>
      </div>
    )
  }

  useEffect(() => {
    if (lang === langs.en) {
      setDlInfo({...dlDaten.en})
    }
    if (lang === langs.de) {
      setDlInfo ({...dlDaten.de})
    }
    // return () => {}
  }, [])
  

  return (
    <div className={styles.container}>

      <CloseMenu setToggle={setToggle}/>

      <div className={styles.contact}>
        {contact.map((item, i) => <SocialIcon key={i} item={item}/>)}
      </div>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/about">
              <a>{lang === langs.en ? 'about' : 'über uns'}</a>
            </Link>
          </li>
          <li>
            <Link href="/call22">
              <a>Open Call 2022</a>
            </Link>
          </li>
          {/* <li onClick={setToggle}>
            <a href='#call'> OPEN CALL </a>
          </li> */}
          {opencall && opencall.map((e, i) => <li onClick={() => handleMenuItem(e.group)} key={i}>
            <span>{e.title}</span>
          </li>)}
          <li>
            <a href={dlInfo.callLink}> {dlInfo.callTitle} </a>
            <div className={styles.dlicon}><Icon.Download {...iconProps}/></div>
          </li>
          <li>
            <a href={dlInfo.formLink}> {dlInfo.formTitle} </a>
            <div className={styles.dlicon}><Icon.Download {...iconProps}/></div>
          </li>
        </ul>
      </nav>

    </div> 
  )
}

export default Menu


const SocialIcon = ({ item }) => {
  const iconProps = {
    color: '#000',
    size: 36,
    strokeWidth: 1.5
  }
  const TagName = Icon[item.name]
  return (
    <>
      <a
        className={styles.contactbtn} 
        href={item.url}
        aria-label={item.name}
        target="_blank"
        rel="noreferrer"
      >
        <TagName {...iconProps}/>
      </a>
    </>
  )
}
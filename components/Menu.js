import { useEffect, useState } from 'react'
// import Link from 'next/link'
import * as Icon from 'react-feather'
import { contact, links } from '../config/sitedata'
import * as styles from '../styles/Menu.module.css'

const Menu = ({ setToggle, content, lang }) => {

  const [dlInfo, setDlInfo] = useState({ })

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
    strokeWidth: 1
  }

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [])

  const handleMenuItem = () => setToggle()

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
    if (lang === 'en') {
      setDlInfo({...dlDaten.en})
    }
    if (lang === 'de') {
      setDlInfo ({...dlDaten.de})
    }
    // return () => {
    // }
  }, [])
  

  return (
    <div className={styles.container}>

      <CloseMenu setToggle={setToggle}/>

      <div className={styles.contact}>
        {contact.map((item, i) => <SocialIcon key={i} item={item}/>)}
      </div>

      <nav className={styles.nav}>
        <ul>
          {content && content.map((e, i) => <li onClick={handleMenuItem} key={i}>
            <a href={`#${e.group}`}>{e.title}</a>
          </li>)}
          <li>
            <a href={dlInfo.callLink}> {dlInfo.callTitle} </a>
            <Icon.Download {...iconProps}/>
          </li>
          <li>
            <a href={dlInfo.formLink}> {dlInfo.formTitle} </a>
            <Icon.Download {...iconProps}/>
          </li>
          {/* <li><Link href='/terms'> Terms and Conditions </Link></li> */}
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
    strokeWidth: 1
  }
  const TagName = Icon[item.name]
  return (
    <>
      <a
        className={styles.contactbtn} 
        href={item.url}
        aria-label={`${item.name} Link`}
        target="_blank"
        rel="noreferrer"
      >
        <TagName {...iconProps}/>
      </a>
    </>
  )
}
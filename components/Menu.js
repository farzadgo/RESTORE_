import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { langs, useLang } from '../components/Layout'
import { contact, links } from '../config/sitedata'
import * as styles from '../styles/Menu.module.css'
import * as Icon from 'react-feather'

const Menu = ({setToggle, opencall, setActive}) => {

  const {lang} = useLang()
  const path = useRouter().pathname

  const [dlInfo, setDlInfo] = useState({})

  const dlData = {
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

  const handleMenuItem = (group) => {
    setToggle()
    setActive(group)
  }

  const handleDlInfo = () => {
    if (lang === langs.en) {
      setDlInfo({...dlData.en})
    }
    if (lang === langs.de) {
      setDlInfo ({...dlData.de})
    }
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
    handleDlInfo()

    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'scroll'
    }
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
            <Link href='/'>
              <a className={path === '/' ? 'activeLink' : ''}>
                HOME <div className={styles.dlicon}><Icon.Box {...iconProps}/></div>
              </a>
            </Link>
          </li>

          <li>
            <Link href='/opencall'>
              <a className={path === '/opencall' ? 'activeLink' : ''}>OPEN CALL 2022</a>
            </Link>
          </li>

          {opencall && <div>
            {opencall.map((e, i) => <li onClick={() => handleMenuItem(e.ID)} key={i}> <span>{e.TITLE}</span> </li>)}
            <br />
            {path === '/opencall' && <li>
              <a href={dlInfo.callLink}> {dlInfo.callTitle} </a>
              <div className={styles.dlicon}><Icon.Download {...iconProps}/></div>
            </li>}
            {path === '/opencall' && <li>
              <a href={dlInfo.formLink}> {dlInfo.formTitle} </a>
              <div className={styles.dlicon}><Icon.Download {...iconProps}/></div>
            </li>}
            <br />
          </div>}

          <li>
            <Link href='/documentation'>
              <a className={path === '/documentation' ? 'activeLink' : ''}>
                {lang === langs.en ? 'DOCUMENTATION 2022' : 'DOKUMENTATION 2022'}
              </a>
            </Link>
          </li>

          <li>
            <Link href='/about'>
              <a className={path === '/about' ? 'activeLink' : ''}>
                {lang === langs.en ? 'ABOUT US' : 'ÜBER UNS'}
              </a>
            </Link>
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
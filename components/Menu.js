import { useEffect } from 'react'
// import Link from 'next/link'
import * as Icon from 'react-feather'
import { contact } from '../config/sitedata'
import * as styles from '../styles/Menu.module.css'

const Menu = ({ setToggle, content }) => {

  const iconProps = {
    color: '#eee',
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
      color: '#eee',
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
            <a href='https://cloud.disorient.xyz/s/TzeZtjiPnmKwXbM/download?path=&files=RESTORE_EN_Aplication_Form.pdf'>Applicatin Form</a>
            <Icon.Download {...iconProps}/>
          </li>
          <li>
            <a href='https://cloud.disorient.xyz/s/TzeZtjiPnmKwXbM/download?path=&files=RESTORE_DE_Formular.pdf'>Anmeldeformular</a>
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
    color: '#eee',
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
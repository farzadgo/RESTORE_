import { useState, useEffect } from 'react'
import * as styles from '../styles/Funding.module.css'
import Image from 'next/image'

import { useLang } from '../components/Layout'

import beauftragte from '../public/fund-logos/01-beauftragte.jpg'
import npn from '../public/fund-logos/02-npn.jpg'
import neustart from '../public/fund-logos/03-neustart.jpg'
import senator from '../public/fund-logos/04-senator.jpg'

const Funding = () => {

  const {lang} = useLang()
  const [body, setBody] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/about')
      const data = await response.json()
      const content = await data.filter(e => e.lang === lang)[0].data
      setBody(content.filter(e => e.ID === 'fund')[0].BODY)
    }
    fetchData()

  }, [lang])
  
  return (
    <>
      <div className={styles.sponsorship}>
        <p>{body}</p>
      </div>
      <div className={styles.logocontainer}>
        <div className={styles.logo}><Image src={npn} layout='fill' objectFit='contain' /></div>
        <div className={styles.logo}><Image src={neustart} layout='fill' objectFit='contain' /></div>
        <div className={styles.logo}><Image src={beauftragte} layout='fill' objectFit='contain' /></div>
        <div className={styles.logo}><Image src={senator} layout='fill' objectFit='contain' /></div>
      </div>
    </>
  )
}
 
export default Funding
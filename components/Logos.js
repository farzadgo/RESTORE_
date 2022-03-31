import { useState, useEffect } from 'react'
import * as styles from '../styles/Logos.module.css'
import Image from 'next/image'

import beauftragte from '../public/fund-logos/01-beauftragte.jpg'
import npn from '../public/fund-logos/02-npn.jpg'
import neustart from '../public/fund-logos/03-neustart.jpg'
import senator from '../public/fund-logos/04-senator.jpg'

const Logos = ({ funding }) => {
  const [body, setBody] = useState('')
  useEffect(() => {
    if (funding) {
      setBody(funding[0].body)
    }
  }, [funding])
  
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
 
export default Logos
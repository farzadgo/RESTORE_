import * as styles from '../styles/Logos.module.css'
import Image from 'next/image'

import beauftragte from '../public/logos/01-beauftragte.jpg'
import npn from '../public/logos/02-npn.jpg'
import neustart from '../public/logos/03-neustart.jpg'
import senator from '../public/logos/04-senator.jpg'




const Logos = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}><Image src={beauftragte} layout='fill' objectFit='contain' /></div>
      <div className={styles.logo}><Image src={npn} layout='fill' objectFit='contain' /></div>
      <div className={styles.logo}><Image src={neustart} layout='fill' objectFit='contain' /></div>
      <div className={styles.logo}><Image src={senator} layout='fill' objectFit='contain' /></div>
    </div>
  )
}
 
export default Logos
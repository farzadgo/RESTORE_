import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import modelimage from '../public/glass-body.png';
import useWindowSize from '../hooks/useWindowSize';
import Scroller from './Scroller';
import styles from '../styles/Home.module.css';

import dynamic from 'next/dynamic';

const Model = dynamic(() => import('./Model'), { ssr: false });


const LandingOne = ({ subtitles }) => {
  const [showModel, setShowModel] = useState(false);
  const {desktop} = useWindowSize();

  useEffect(() => {
    if (desktop) {
      setShowModel(true);
    } else {
      setShowModel(false);
    }
    return () => setShowModel(false);
  }, [desktop]);


  return (
    <section className={styles.landing} id='landing'>
      <div data-test="landing-titles" className={styles.landingtitles}>
        <h1> RESTORE_ </h1>
        <h2> {subtitles.title} </h2>
        <p> {subtitles.dates} </p>
        <Link href='/opencall'>
          {subtitles.opencall}
        </Link>
      </div>
      <Scroller />

      { showModel ?
        <Model /> :
        <div style={{padding: '10px'}}>
          <Image src={modelimage} width={390} height={390} />
        </div>
      }
    </section>
  )
}

export default LandingOne
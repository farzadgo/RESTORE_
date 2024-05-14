import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Paragraph from './Paragraph';
import styles from '../styles/Home.module.css';

// import ReactPlayer from 'react-player';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


const LandingTwo = ({ subtitles }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const videoContainerRef = useRef(null);

  const videoCallBack = (entries) => {
    const [entry] = entries
    setIsPlaying(entry.isIntersecting)
  }
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.75
  }

  // useEffect(() => {
  //   if (typeof window !== "undefined") setHasWindow(true);
  // }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(videoCallBack, options)
    if (videoContainerRef.current) observer.observe(videoContainerRef.current)
    return () => {
      if (videoContainerRef.current) observer.unobserve(videoContainerRef.current)
    }
  }, [videoContainerRef, options])


  return (
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
        {subtitles.documentation}
      </Link>
    </section>
  )
}

export default LandingTwo
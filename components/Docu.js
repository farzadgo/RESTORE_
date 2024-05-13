import { useEffect, useState } from 'react'
import { langs, useLang } from '../components/Layout'
import Paragraph from '../components/Paragraph'
import ShiftImage from '../components/ShiftImage'
import styles from '../styles/Docu.module.css'
import useWindowSize from '../hooks/useWindowSize'


const Docu = ({groupContent}) => {

  const {lang} = useLang()
  const {width} = useWindowSize()

  const imageSlugs = groupContent.IMAGE_URIS
  const groupID = groupContent.ID

  const [groupBody, setGroupBody] = useState('')

  const [imgSize, setImgSize] = useState(0)
  const [offset, setOffset] = useState(0)

  const [credits, setCredits] = useState({
    PHOTO: '',
    VIDEO: '',
    TECH: ''
  })

  const creditsData = {
    en: {
      PHOTO:'photo credits: <b> Jiye Lee </b>',
      VIDEO: 'video: <b> Julija Paskeviciute </b>',
      TECH: 'technical management: <b> Patrick Peljhan, Abdulghaffar Tammaa </b>'
    },
    de: {
      PHOTO:'Bildnachweise: <b> Jiye Lee </b>',
      VIDEO: 'Video: <b> Julija Paskeviciute </b>',
      TECH: 'Technische Leitung: <b> Patrick Peljhan, Abdulghaffar Tammaa </b>'
    }
  }

  const createMarkup = (string) => {
    return {__html: string}
  }

  useEffect(() => {
    let imgWidth;

    if (width < 800) {
      imgWidth = window.innerWidth - 20;
      setOffset(0);
    } else {
      if (width < 1300) {
        imgWidth = 790;
        setOffset((width - imgWidth) * 0.4);
      } else {
        imgWidth = 1000;
        setOffset((width - imgWidth) * 0.6);
      }
    }

    setImgSize(imgWidth)
  }, [width])


  useEffect(() => {
    setGroupBody(groupContent.BODY.filter(e => e.lang === lang)[0].data)

    if (lang === langs.en) {
      setCredits({...credits, ...creditsData.en})
    } else {
      setCredits({...credits, ...creditsData.de})
    }
  }, [groupContent, lang])


  return (
    <>
      <div className={styles.docuParags}>
        <Paragraph content={groupContent} body={groupBody} />
      </div>
      <div className={styles.docuGallery}>
        {imageSlugs && imageSlugs.map(slug =>
          <ShiftImage
            key={slug}
            slug={slug}
            imageSize={imgSize}
            groupID={groupID}
            offset={offset}
            screenWidth={width}
          />
        )}
      </div>
      <div className={styles.docuCredits}>
        <p  dangerouslySetInnerHTML={createMarkup(credits.PHOTO)} />
        <p  dangerouslySetInnerHTML={createMarkup(credits.VIDEO)} />
        <p  dangerouslySetInnerHTML={createMarkup(credits.TECH)} />
      </div>
    </>
  )
}

export default Docu
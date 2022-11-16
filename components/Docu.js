import { useEffect, useState } from 'react'
import { langs, useLang } from '../components/Layout'
import Paragraph from '../components/Paragraph'
import ShiftImage from '../components/ShiftImage'
import styles from '../styles/Docu.module.css'


const Docu = ({groupContent}) => {

  const {lang} = useLang()
  const [width, setWidth] = useState()

  const imageSlugs = groupContent.IMAGE_URIS
  const groupID = groupContent.ID

  const [groupBody, setGroupBody] = useState('')

  const [imageWidth, setImageWidth] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)
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

  const handleResize = () => {
    let width = window.innerWidth
    setWidth(width)
    let imgWidth

    if (width > 1300) {
      imgWidth = 1000
      setOffset((width - imgWidth) * 0.6)
    }
    if (width > 800 && width < 1299) {
      imgWidth = 790
      setOffset((width - imgWidth) * 0.4)
    }
    if (width < 799) {
      imgWidth = window.innerWidth - 20
      // imgWidth = window.innerWidth
      setOffset(0)
    }

    setImageWidth(imgWidth)
    setImageHeight(imgWidth * 0.666)
    // setTextContainerWidth(imgWidth - 20)
  }


  useEffect(() => {
    setGroupBody(groupContent.BODY.filter(e => e.lang === lang)[0].data)

    if (lang === langs.en) {
      setCredits({...credits, ...creditsData.en})
    } else {
      setCredits({...credits, ...creditsData.de})
    }

    setWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [groupContent, lang])


  return (
    <>
      <div className={styles.docuParags}>
        <Paragraph content={groupContent} body={groupBody} width={width}/>
      </div>
      <div className={styles.docuGallery}>
        {imageSlugs && imageSlugs.map(slug =>
          <ShiftImage
            key={slug}
            slug={slug}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
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
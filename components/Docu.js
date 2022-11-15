import { useEffect, useState } from 'react'
import { useLang } from '../components/Layout'
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
    </>
  )
}

export default Docu
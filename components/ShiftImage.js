import { useEffect, useState } from 'react'
import styles from '../styles/ShiftImage.module.css'
import Image from 'next/image'

const ShiftImage = ({slug, imageWidth, imageHeight, groupID, offset, screenWidth}) => {

  const cloudinaryURL = 'https://res.cloudinary.com/dd3tumnu6/image/upload/RESTORE_'

  const [url, setUrl] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  
  const handlePosition = event => {
    let position
    let divToMove = event.target.parentElement
    position = (Math.random() * offset)
    divToMove.style.left = `${position}px`
    // divToMove.style.transition = 'all 0.6s'
  }

  useEffect(() => {
    let url = `${cloudinaryURL}/${groupID}/${slug}.png`
    setUrl(url)

    let orientation = slug.split('_').splice(-1)[0]
    if (orientation === 'land') {
      setWidth(imageWidth)
      setHeight(imageHeight)
    } else {
      if (screenWidth < 800) {
        setWidth(screenWidth - 20)
        setHeight((screenWidth -20) * 1.5)
      } else {
        setWidth(imageHeight)
        setHeight(imageWidth)
      }
    }

  }, [groupID, slug, imageWidth, imageHeight, screenWidth])


  return (
    <div className={styles.imageContainer}>
      {url && <Image
        src={url}
        alt={`photo from ${groupID}`}
        unoptimized
        width={width}
        height={height}
        onLoad={handlePosition}
      />}
    </div>
  )
}

export default ShiftImage
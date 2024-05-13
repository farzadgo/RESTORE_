import { useEffect, useState } from 'react'
import styles from '../styles/ShiftImage.module.css'
import Image from 'next/image'

const ShiftImage = ({slug, imageSize, groupID, offset, screenWidth}) => {

  const cloudinaryURL = 'https://res.cloudinary.com/dd3tumnu6/image/upload/RESTORE_'

  const [url, setUrl] = useState('')
  const [imgDims, setImgDims] = useState({width: 0, height: 0})
  const [container, setContainer] = useState(null);

  const handlePosition = elem => {
    let position
    position = (Math.random() * offset)
    elem.style.left = `${position}px`
    // elem.style.transition = 'all 1.0s'
  }

  const handleLoad = event => {
    let container = event.target.parentElement;
    handlePosition(container);
    setContainer(container);
  }

  useEffect(() => {
    if (container) handlePosition(container);
  }, [offset, container])
  

  useEffect(() => {
    let url = `${cloudinaryURL}/${groupID}/${slug}.png`
    setUrl(url)

    let orientation = slug.split('_').splice(-1)[0]
    if (orientation === 'land') {
      setImgDims({...imgDims,
        width: imageSize,
        height: imageSize * 0.666
      })
    } else {
      if (screenWidth < 800) {
        setImgDims({...imgDims,
          width: screenWidth - 20,
          height: (screenWidth -20) * 1.5
        })
      } else {
        setImgDims({...imgDims,
          width: imageSize * 0.666,
          height: imageSize
        })
      }
    }

  }, [groupID, slug, imageSize, screenWidth])


  return (
    <div className={styles.imageContainer}>
      {url && <Image
        src={url}
        alt={`photo from ${groupID}`}
        unoptimized
        width={imgDims.width}
        height={imgDims.height}
        onLoad={handleLoad}
      />}
    </div>
  )
}

export default ShiftImage
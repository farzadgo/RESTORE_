import { useEffect, useState } from 'react'
import styles from '../styles/Paragraph.module.css'
import useWindowSize from '../hooks/useWindowSize'

const Paragraph = ({content, body}) => {

  const [cardWidth, setCardWidth] = useState(20)
  const [position, setPosition] = useState(0)
  const {width} = useWindowSize()

  const paragStyle = {
    width: cardWidth,
    left: position
  }

  const [title, artistNames, address] = [content.TITLE, content.ARTISTS, content.ADDRESS]
  const [area, day, month, year, time] = [content.AREA, content.DAY, content.MONTH, content.YEAR, content.TIME]
  const [subtitle, setSubtitle] = useState(false)

  const createMarkup = (string) => {
    return {__html: string}
  }

  const handleDataReady = () => {
    if (area && day && month && year && time) setSubtitle(true)
  }


  useEffect(() => {
    handleDataReady()
    
    let offset
    if (width > 1700) {
      offset = width * 0.5
    } else if (width > 1300 && width < 1699) {
      offset = width * 0.4
    } else if (width > 900 && width < 1299) {
      offset = width * 0.3
    } else {
      offset = 0
    }

    if (width) setCardWidth((width - offset) - 20)
    setPosition((Math.random() * offset))

  }, [width])

  return (
    <div className={styles.container} style={paragStyle}>

      {title && <h1 className={styles.title}>{title}</h1>}

      {artistNames && <ul className={styles.artistNames}>{artistNames.map((a, i) => <h2 key={i}>{a}</h2>)}</ul>}

      {subtitle && <h3 className={styles.subtitle}>{area} • {day}. {month} {year} • {time}H</h3>}

      {address && <p className={styles.address}>{address}</p>}

      {body && <div className={styles.article}>{body.map((e, i) => <p key={i} dangerouslySetInnerHTML={createMarkup(e)}/>)}</div>}

    </div>
  )
}

export default Paragraph
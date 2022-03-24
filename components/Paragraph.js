import { useEffect, useState, useRef } from 'react'
import styles from '../styles/Paragraph.module.css'

const Paragraph = ({ content, width, activeParag, setActive }) => {

  const [cardWidth, setCardWidth] = useState('')
  const [position, setPosition] = useState('')

  const paragStyle = {
    width: cardWidth,
    left: position
  }
  
  const bodyRef = useRef(null)
  const [bodyHeight, setBodyHeight] = useState('')

  const bodyStyle = {
    height: bodyHeight,
  }

  const handleTitleClick = () => {
    // e.preventDefault()
    // bodyRef.current.style.background = 'blue'
    setActive(content.group)
  }


  useEffect(() => {
    if (content.group !== 'intro' && content.group !== 'we') {
      setBodyHeight(0)
    }

    if (content.group === activeParag) {
      setBodyHeight('auto')
    }

    // return () => {}
  }, [activeParag])
  

  useEffect(() => {
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
    setCardWidth((width - offset) - 20)
    setPosition((Math.random() * offset))

    // if (width < 600) {
    //   setCardWidth('100%')
    //   setPosition('auto')
    // }
  
    // return () => {}
  }, [width])

  return (
    <div className={styles.parag} style={paragStyle} id={content.group}>

      {content.title && <h3 onClick={handleTitleClick}>{content.title}</h3>}

      <div ref={bodyRef} className={styles.paragbody} style={bodyStyle}>
        {content.body && content.body.map(e => {
          let idone = Math.random().toString(36).substring(2, 15)
          if (typeof e === 'string') {
            return <p className={styles.paragprime} key={idone}>{e}</p>
          } else {
            return <ul className={styles.paraglist} key={idone}>{e.map(p => {
              let idtwo = Math.random().toString(36).substring(2, 15)
              if (typeof p === 'string') {
                return <li key={idtwo}>{p}</li>
              } else {
                return <ul key={idtwo}>{p.map((e, i) => <li key={i}>{e}</li>)}</ul>
              }
            })}</ul>
          }
        })}
      </div>

    </div>
  )
}

export default Paragraph
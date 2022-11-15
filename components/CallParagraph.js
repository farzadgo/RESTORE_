import { useEffect, useState, useRef } from 'react'
import styles from '../styles/Paragraph.module.css'

const CallParagraph = ({content, width, activeParag, setActive}) => {

  const [cardWidth, setCardWidth] = useState('')
  const [position, setPosition] = useState('')

  const [title, setTitle] = useState('')

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
    setActive(content.ID)
  }

  const createMarkup = (string) => {
    return {__html: string}
  }


  useEffect(() => {
    if (content.ID !== 'intro') {
      setBodyHeight(0)
    }
    if (content.ID === activeParag) {
      setBodyHeight('auto')
    }
    if (content.TITLE) {
      let title = content.TITLE.toUpperCase()
      setTitle(title)
    }

  }, [activeParag, content])


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

  }, [width])

  return (
    <div className={styles.container} style={paragStyle} id={content.ID}>

      <h1 className={styles.title} style={{cursor: 'pointer'}} onClick={handleTitleClick}>{title}</h1>

      <div ref={bodyRef} className={styles.article} style={bodyStyle}>
        {content.BODY && content.BODY.map(e => {
          let idone = Math.random().toString(36).substring(2, 15)
          if (typeof e === 'string') {
            return <p key={idone} dangerouslySetInnerHTML={createMarkup(e)} />
          } else {
            return <ul className={styles.articleList} key={idone}>{e.map(p => {
              let idtwo = Math.random().toString(36).substring(2, 15)
              if (typeof p === 'string') {
                return <li key={idtwo} dangerouslySetInnerHTML={createMarkup(p)} />
              } else {
                return <ul key={idtwo}>{p.map((e, i) => <li key={i} dangerouslySetInnerHTML={createMarkup(e)} />)}</ul>
              }
            })}</ul>
          }
        })}
      </div>

    </div>
  )
}

export default CallParagraph
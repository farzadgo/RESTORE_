import * as styles from '../styles/Buttons.module.css'

const Buttons = ({lang, langs, setLang, setToggle}) => {
  return (
    <>
      <button onClick={setLang} className={styles.langbut}>
          {lang === langs.en ? 'DE' : 'EN'}
      </button>
      <button onClick={setToggle} className={styles.menubut}> ☰ </button>
    </>
  )
}

export default Buttons
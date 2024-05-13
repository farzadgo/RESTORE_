import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { langs, useLang } from '../components/Layout'
import Menu from '../components/Menu'
import Buttons from '../components/Buttons'
import Funding from '../components/Funding'
import CallParagraph from '../components/CallParagraph'

import styles from '../styles/Opencall.module.css'

// import { server } from '../config'
// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api`)
//   const data = await res.json()
//   return {
//     props: { openCall: data }
//   }
// }

const Opencall = () => {

  const router = useRouter()
  const {lang, setLang} = useLang()
  const [toggle, setToggle] = useState(false)

  const toggler = () => setToggle(prev => !prev)
  const langToggler = () => setLang(lang === langs.en ? langs.de : langs.en)

  const [opencall, setOpencall] = useState('')

  const [activeParag, setActiveParag] = useState('intro')
  const setActive = (id) => {
    setActiveParag(id)
    router.push(`${router.pathname}#${id}`)
  }

  const [deadline, setDeadline] = useState('')
  const deadlineText = {
    en: 'Deadline: 21 April 2022',
    de: 'Bewerbungsfrist: 21 April 2022'
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/opencall')
      const data = await response.json()
      const content = await data.filter(e => e.lang === lang)[0].data
      setOpencall(content)
    }
    fetchData()

    if (lang === langs.en) {
      setDeadline(deadlineText.en)
    } else {
      setDeadline(deadlineText.de)
    }
  }, [lang])

  return (
    <div style={{overflowX: 'hidden'}}>

      {toggle && <Menu setToggle={toggler} lang={lang} opencall={opencall} setActive={setActive} />}

      <Buttons lang={lang} langs={langs} setLang={langToggler} setToggle={toggler}/>

      <section className={styles.call}>
        <div className={styles.callTitle}>
          <h3>{deadline}</h3>
        </div>
        <div className={styles.callParags}>
          {opencall && opencall.map(e => <CallParagraph key={e.ID} content={e} activeParag={activeParag} setActive={setActive}/>)}
        </div>
      </section>

      <Funding />

    </div>
  )
}

export default Opencall


import styles from '../styles/Scroller.module.css'

const Scroller = () => {
  return (
    <div className={styles.scroller}>
      <div className={styles.marquee}>
        <p>
          OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL !
          OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL !
          &nbsp;
        </p>
        <p>
          OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL !
          OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL ! OPEN CALL !
          &nbsp;
        </p>
      </div>
    </div>
  )
}
 
export default Scroller

import styles from '../styles/Scroller.module.css'

const Scroller = () => {
  return (
    <div className={styles.scroller}>
      <div className={styles.marquee}>
        <p>
          RESTORE_ RESTORE_ RESTORE_ RESTORE_ RESTORE_ RESTORE_
          RESTORE_ RESTORE_ RESTORE_ RESTORE_ RESTORE_ RESTORE_
          &nbsp;
        </p>
        <p>
          RESTORE_ RESTORE_ RESTORE_ RESTORE_ RESTORE_ RESTORE_
          RESTORE_ RESTORE_ RESTORE_ RESTORE_ RESTORE_ RESTORE_
          &nbsp;
        </p>
      </div>
    </div>
  )
}
 
export default Scroller

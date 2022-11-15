import Link from 'next/link'

const NotFound = () => {
  const notFound = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - var(--header-height))',
    backgroundColor: 'black',
    color: '#eee',
    fontSize: '1.2em',
    fontFamily: 'var(--space-font)',
    fontWeight: '300'
  }
  return (
    <div style={notFound}>
      <p> no RESTORE_ page here ☹</p>
      <br />
      <Link href='/'>
        <a><b>⮌ HOME</b></a>
      </Link>
    </div>
  )
}
 
export default NotFound;
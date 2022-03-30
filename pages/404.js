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
    fontSize: '1.2em'
  }
  return (
    <div style={notFound}>
      <p> Sorry, page not found!</p>
      <span>______</span>
      <Link href='/' > HOME </Link>
    </div>
  )
}
 
export default NotFound;
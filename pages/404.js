import Link from 'next/link'

const NotFound = () => {
  const notFound = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 124px)'
  }
  return (
    <div style={notFound}>
      <p>Sorry, page not found!</p>
      <Link href='/'>HOME PAGE</Link>
    </div>
  )
}
 
export default NotFound;
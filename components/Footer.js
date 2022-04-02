const Footer = () => {
  const footerStyle = {
    display: 'flex',
    width: '100%',
    minHeight: 'var(--header-height)',
    background: '#0000ff',
    color: '#eee',
    fontWeight: 'bold',
    alignItems: 'center',
    padding: '0 var(--padding)',
    justifyContent: 'start',
    fontSize: '1em',
    fontWeight: '300',
    fontFamily: 'var(--space-font)'
  }
  return (
    <footer style={footerStyle}>
      <p> Copyright 2022 RESTORE_ </p>
    </footer>
  )
}
 
export default Footer
import Head from 'next/head'
import { title, description, keywords } from '../config/sitedata'
import og from '../public/og.png'

const Meta = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet='utf-8' />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="theme-color" content="#0000ff"></meta>
      <meta name="image" content={og} />

      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Meta
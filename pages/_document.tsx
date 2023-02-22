import { Html, Head, Main, NextScript } from 'next/document'
import Modal from './components/modal'

export default function Document(): JSX.Element {
  return (
    <Html lang="en" data-theme="dark">
      <Head />
      <Modal />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

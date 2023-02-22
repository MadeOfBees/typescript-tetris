import { Html, Head, Main, NextScript } from 'next/document'
import Modal from './components/modal'

export default function Document(): JSX.Element {
  return (
    <Html lang="en" data-theme="dark">
    <Modal />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

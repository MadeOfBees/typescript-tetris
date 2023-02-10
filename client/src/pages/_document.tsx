import { Html, Head, Main, NextScript } from 'next/document'
import ContactDetails from '@/Components/contactDetails'


export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head />
      <input type="checkbox" id="contactModal" className="modal-toggle" />
      <label htmlFor="contactModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="contactModal">
          <ContactDetails />
        </label>
      </label>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

import './globals.css'

export const metadata = {
  title: 'Logup - Authentication Platform',
  description: 'Secure login and signup platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
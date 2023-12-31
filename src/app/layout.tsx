// import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/main.min.css'
import './globals.css'
import { Inter, Roboto } from 'next/font/google'
import { Container} from '@/components/bootstrap'
import { Metadata } from 'next'
import NavBar from './navbar/NavBar'
import Footer from './footer'
import  { MetaMaskContextProvider} from '../hooks/useMetaMask'


const inter = Roboto({ 
  weight: ['400'],
  subsets: ['latin'], 
  display: 'swap'})

export const metadata: Metadata = {
  title: 'Periwnkl',
  description: 'Periwnkl',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MetaMaskContextProvider>
    <html lang="en">
      <body className={inter.className}>
          <NavBar />
          <main>
            <Container className='py-4'>
              {children}
            </Container>
          </main>
          <Footer />
      </body>
    </html>
    </MetaMaskContextProvider>
  )
}

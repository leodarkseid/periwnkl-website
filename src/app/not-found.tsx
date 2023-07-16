import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ERROR 404 || Periwnkl CRM',
  description: 'something went wrong',
}

export default function NotFound() {
    return (
        <div>
            <h1>Not Found</h1>
            <h2>Error 404</h2>
            <p>Sorry, this page does not exist </p>
        </div>
    )
}
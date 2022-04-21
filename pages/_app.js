import "bootstrap/dist/css/bootstrap.min.css"
import SSRProvider from 'react-bootstrap/SSRProvider'
import useSession from "@lib/session"
import Navigation from "@components/Navigation"
import "./_app.css"

export default function App({ Component, pageProps }) {
    const session = useSession()
    const newPageProps = {
        ...pageProps,
        session
    }
    return (
        <SSRProvider>
            <Navigation session={session}/>
            <main className="page">
                <Component {...newPageProps} />
            </main>
        </SSRProvider>
    )
}
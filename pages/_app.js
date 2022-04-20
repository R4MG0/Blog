import "bootstrap/dist/css/bootstrap.min.css"
import SSRProvider from 'react-bootstrap/SSRProvider'
import Header from "@components/Header"
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
            <Header>
                <Navigation session={session}/>
            </Header>

            <main className="page">
                <Component {...newPageProps} />
            </main>
        </SSRProvider>
    )
}
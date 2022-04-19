import "bootstrap/dist/css/bootstrap.min.css"
import SSRProvider from 'react-bootstrap/SSRProvider'
import Header from "@components/Header"
import useSession from "@lib/session"
import Link from "next/link"
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
                {session.user && <Link href={"/"}>Home</Link>}
                { session.user && <Link href="/posts/create">Create</Link>}
                { session.user && <Link href="/profile"><a>{session.user.firstname}</a></Link>}
                <Link href="/login" passHref>
                    { session.user ? <a onClick={session.logout}>logout</a>:<a> </a> }
                </Link>
               
            </Header>

            <main className="page">
                <Component {...newPageProps} />
            </main>
        </SSRProvider>
    )
}
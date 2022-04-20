import {Navbar, Container, Nav} from "react-bootstrap"
import Link from "next/link"

export default function Navigation({session}){

    return(
    <Navbar bg="light" variant="light">
        <Container>
            {session.user && <Link  href={"/"} passHref><Navbar.Brand>Posts</Navbar.Brand></Link>}
            <Nav className="me-auto">
                { session.user && <Link href="/posts/create" passHref><Nav.Link >Create</Nav.Link></Link>}
                { session.user && <Link href="/profile" passHref><Nav.Link >{session.user.firstName}</Nav.Link></Link>}
                { session.user && <Link href="/login" passHref><Nav.Link onClick={session.logout}>logout</Nav.Link></Link>}
            </Nav>
        </Container>
    </Navbar>
    )
}
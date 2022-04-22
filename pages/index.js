import styles from "./index.module.css"
import Link from "next/link"
import {useAccordionButton} from "react-bootstrap"
import { useRedirectToLogin } from "@lib/session"
import { useEffect, useState } from "react"
import { getAllPosts } from "@lib/api"
import { Button, ListGroup, ListGroupItem, Card, Accordion } from "react-bootstrap"


const profile = "https://banner2.cleanpng.com/20180525/fbc/kisspng-computer-icons-user-symbol-company-profile-5b084df3719b03.2755377715272708994653.jpg"

export default function IndexPage({ session }) {

    useRedirectToLogin(session)

    const [posts, setPosts] = useState([])

    useEffect(() => {

        const loadPosts = async () => {
            const response = await getAllPosts()
            setPosts(response)

        }

        loadPosts()
    }, [])



    return (
        <div className={styles.posts}>
            {session.user &&
                posts.map(post => {
                    return (
                        <div key={post.id}>
                            <Card className={styles.hello}>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                    <Card.Title>{post.title}</Card.Title>
                                    </ListGroupItem>
                                </ListGroup>
                                <Card.Img variant="top" src={post.img} className="img"></Card.Img>
                                <Card.Body>
                                    <div className={styles.profile}>
                                        <div className={styles.img}>
                                        {session.user.img ? <img src={session.user.img}/> : <img src={profile}/>}
                                        </div> 
                                        {post.user}
                                    </div>
                                        <div className={styles.topRight}>
                                            <Card.Subtitle align="right">{post.date}</Card.Subtitle>
                                        </div>
                                    
                                    <Link href={`/posts/${post.id}`}>
                                        <Button variant="primary" >
                                            Details
                                        </Button>
                                    </Link>
                                    <Link href={`/posts/${post.id}`}>
                                        <Button style={{ background:'none', border:'none'}} variant="primary">💬</Button>
                                    </Link>
                                    
                                    {/* <Card.Img src={session.user.img}/> */}
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}
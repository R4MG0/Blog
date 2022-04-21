import styles from "./index.module.css"
import Link from "next/link"
import {useAccordionButton} from "react-bootstrap"
import { useRedirectToLogin } from "@lib/session"
import { useEffect, useState } from "react"
import { getAllPosts } from "@lib/api"
import { Button, ListGroup, ListGroupItem, Card, Accordion } from "react-bootstrap"


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
                                    <ListGroupItem>created by {post.user}
                                        <div className={styles.topRight}>
                                            <Card.Subtitle align="right">{post.date}</Card.Subtitle>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                                <Card.Img variant="top" src={post.img} ></Card.Img>
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Link href={`/posts/${post.id}`}>
                                        <Button variant="primary" >
                                            Details
                                        </Button>
                                    </Link>
                                    <Link href={`/posts/${post.id}`}>
                                        <Button style={{ background:'none', border:'none'}} variant="primary">💬</Button>
                                    </Link>
                                    {/* <Card.Img variant="bottom-right" src="/public/comment.jpg"></Card.Img> */}
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}
import styles from "./index.module.css"
import Link from "next/link"
import { useRedirectToLogin } from "@lib/session"
import { useEffect, useState } from "react"
import {getAllPosts, getUserById} from "@lib/api"
import { Button, ListGroup, ListGroupItem, Card, Accordion } from "react-bootstrap"
import {Image} from "next/image"


export default function IndexPage({session}) {
    
    useRedirectToLogin(session)

    const [posts, setPosts] = useState([])

    useEffect(() => {

        const loadPosts = async () => {
            const response = await getAllPosts()
            console.log(response)
            setPosts(response)
            
        }

        loadPosts()
    }, [])

    return (
        <div className={styles.posts}>
            {session.user &&
                posts.map(post => {
                    return(
                        <div>
                            <Card style={{ width: 'auto' }}>
                                <Accordion>
                                    <Card.Img variant="top" src={post.img} ></Card.Img>
                                    <Card.Body>
                                        <Card.Title>{post.title}</Card.Title>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Description</Accordion.Header>
                                            <Accordion.Body>
                                            {post.description}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Button variant="primary" href={`/posts/${post.id}`}>
                                            <a>Details</a>
                                        </Button>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem>created by {post.user}</ListGroupItem>
                                        </ListGroup>
                                    </Card.Body>
                                </Accordion>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}
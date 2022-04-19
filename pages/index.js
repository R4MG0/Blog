import styles from "./index.module.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import {getAllPosts, getUserById} from "@lib/api"
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"


export default function IndexPage({session}) {
    
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
                            <Card key={post.id}>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Img variant="top" src={post.img} />
                                <Card.Body>
                                <Card.Text>
                                {post.description}
                                </Card.Text>
                                <Button href="/posts/index">
                                    <a>Details</a>
                                </Button>
                                <Card.Text>created by {post.user}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}
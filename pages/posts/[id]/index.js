import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getPostById} from "@lib/api"
import { deletePost } from "@lib/api"
import {Button} from "react-bootstrap"
import styles from "./index.module.css"

export default function IdIndexPage({session}){
    
    const router = useRouter()
    const { id } = router.query
    const [post, setPost] = useState(null)

    useEffect(() => {
        if(!id) return
    
        const loadPost = async () => {
            const response = await getPostById(id)
            setPost(response)
        }
        loadPost()
    }, [id])

    async function kill(){
        const resp = await deletePost(id, session.accessToken)
        router.push("/")
    }

    return post &&(
        <div className={styles.singlePost}>
            <div key={post.id}>
                <h1 className={styles.title}>{post.title}</h1>
                <img className={styles.image} src={post.img}/>
                <p className={styles.text}>{post.description}</p>
                
                { session.user && 
                <div>
                    <Button onClick={kill}>delete</Button> 
                    <a href={`/posts/${post.id}/edit`}>
                        <Button>edit</Button>
                    </a> 
                </div>
                }
                
            </div>
        </div>
    )
}
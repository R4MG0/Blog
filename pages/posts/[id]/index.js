import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getPostById} from "@lib/api"
import { deletePost } from "@lib/api"
import {Button} from "react-bootstrap"

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
        await deletePost(id, session.accessToken)
        router.push("/")
    }

    return post &&(
        <div>
            <div key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.text}</p>
                
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
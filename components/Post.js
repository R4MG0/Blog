import { useEffect, useState } from "react"
import { updatePost, createPost } from "@lib/api"
import { useRouter } from "next/router"
import {Form, Row, Col, Button} from "react-bootstrap"


const defaultModel = {
    title: "",
    img:"",
    description: "",
    user: ""
}
function validateModel(post) {
    const errors = {
        title: "",
        img:"",
        description: "",
        user: ""
    }
    let isValid = true

    if(post.title === "") {
        errors.title = "Please enter a title"
        isValid = false;
    }
    
    if(post.description === "") {
        errors.description = "please enter a description"
        isValid = false;
    }

    if(post.img === null) {
        errors.img = "Please put a img"
        isValid = false;
    }

    if(post.userID === 0 || post.userID === null){
        errors.userID = "pls log in"
        isValid = false
    }

    return { errors, isValid }
}

export default function Post({session, postToEdit}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(defaultModel)
    const [post, setPost] = useState(defaultModel)

    useEffect(() => {
        if (postToEdit) {
            setPost(postToEdit)
        }
    }, [postToEdit])

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        
        setPost({ 
            ...post,
            [name]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        setErrors(defaultModel)
        const result = validateModel(post)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        if (post.id) {
            await updatePost(post, session.accessToken)
            setPost(post)
            router.push(`/`)
        } else {

            post.userId = session.user.id
            const newPost = await createPost(post, session.accessToken)
            router.push(`/`)
        }

        setIsLoading(false)
    }

    return(
        <Form onSubmit={handleSubmit}>
            {postToEdit ? <h1>Update Post</h1> : <h1>Create Post</h1>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control  placeholder="Title" name="title" value={post.title} onChange={handleChange}/>
                {errors.title && <div>{errors.title}</div>}
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label onChange={handleChange}>Pictures</Form.Label>
                <Form.Control type="file" multiple />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="descrption" value={post.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                First Name
                </Form.Label>
                <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={session.user.firstname} />
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit">Save</Button>
        </Form>
    )
}
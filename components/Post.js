import { useEffect, useState, useRef } from "react"
import {createPost, updatePost } from "@lib/api"
import { useRouter } from "next/router"
import { useRedirectToLogin } from "@lib/session"
import {Form, Row, Col, Button} from "react-bootstrap"

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})


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

    useRedirectToLogin(session)
    
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(defaultModel)
    const [post, setPost] = useState(defaultModel)


    const [base64Image, setBase64Image] = useState("")
    const [imagePath, setImagePath] = useState("")

    const fileInput = useRef(null)


    useEffect(() => {
        if (postToEdit) {
            setPost(postToEdit)
        }
    }, [postToEdit])

    useEffect(() => {
        if(!base64Image) return

        alert(post)

        const uploadImage = async () => {
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    base64Image
                })
            })
    
            const data = await response.json()
            setImagePath(data.filePath)
        }
        
        uploadImage()
    }, [base64Image])

    const onFileInputChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const base64 = await toBase64(file)
        setBase64Image(base64)
    }

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

        setErrors(defaultModel)

        post.img = imagePath
        post.user = session.user.firstName 
        const result = validateModel(post)

        if(!result.isValid) {
            alert("123123412341341321")
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        if(post.id){
            alert("aorsitnaorisetnaosiretnaorsietnaorsietnaoirsent")
            await updatePost(post, session.accessToken)
            setPost(post)
            router.push(`/posts/${post.id}`)
        }else{
            const newPost = await createPost(post, session.accessToken)
            router.push(`/`)
        }
        setIsLoading(false)
    }

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                {postToEdit ? <h1>Update Post</h1> : <h1>Create Post</h1>}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control  placeholder="Title" name="title" defaultValue={post.title} onChange={handleChange}/>
                    {errors.title && <div>{errors.title}</div>}
                </Form.Group>
                
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label >Pictures</Form.Label>
                    {postToEdit && <img src={postToEdit.img} style={{width: '100%'}}/>}
                    <Form.Control type="file" defaultValue={post.img} onChange={onFileInputChange} name="img" multiple />
                </Form.Group>


                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" defaultValue={post.description} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    First Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control plaintext readOnly  defaultValue={session.user?.firstName} name="user" />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </div>
    )
}
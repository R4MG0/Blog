import { useState, useEffect, useRef } from "react"
import { Button } from "react-bootstrap"
import { updateUser, updateProfilePic } from "@lib/api"
import { Form } from "react-bootstrap"
import { useRouter } from "next/router"
import { useRedirectToLogin } from "@lib/session"
import styles from './index.module.css'
import Link from 'next/link'


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})



export default function Settings({ session }) {

    useRedirectToLogin(session)

    const [user, setUser] = useState({})
    const router = useRouter()

    const [base64Image, setBase64Image] = useState("")
    const [imagePath, setImagePath] = useState("")

    const fileInput = useRef(null)


    useEffect(() => {
        setUser(session.user)
    }, [session.user])




    const submit = async (e) => {
        e.preventDefault()

        user.img = imagePath

        const res = await updateProfilePic(user.id, user.img, session.accessToken)
        session.updateUser(res)
        // const resp = await updateUser(user, session.accessToken)

        router.push('/profile')
        // session.logout()
    }



    const onFileInputChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const base64 = await toBase64(file)
        setBase64Image(base64)
    }

    useEffect(() => {
        if (!base64Image) return

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

    return (
        <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control type="email" plaintext readOnly defaultValue={user?.email} name="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <div className={styles.password}>
                    <Form.Control type="password" defaultValue="Password" name="password" readOnly plaintext/>
                    <Link style={{color:'fff', textDecoration:"none"}} href="/profile/settings/password"  >
                    <Button variant="primary">Change</Button>
                    </Link>
                </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>First Name</Form.Label>
                <Form.Control defaultValue={user?.firstName} plaintext readOnly name="firstName" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Last Name</Form.Label>
                <Form.Control defaultValue={user?.lastName} plaintext readOnly name="lastName" />
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label >Profile pic</Form.Label>

                <Form.Control type="file" defaultValue={user?.img} onChange={onFileInputChange} name="img" />
            </Form.Group>
            <Button variant="primary" type="submit">Save</Button>
            <Button onClick={() => router.push('/')}>Back</Button>
        </Form>
    )
}
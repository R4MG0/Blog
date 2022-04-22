import { useState, useEffect } from "react"
import { useRedirectToLogin } from "@lib/session"
import { useRouter } from "next/router"
import {updateUser} from "@lib/api"
import {Form, Button} from "react-bootstrap"
import Link from 'next/link'


function validatePasswords(password1, password2) {
    let error = {
        Both: ""
    }
    let isValid = true

    if(password1 !== password2) {
        error.Both = "The passwords dosen't match each other"
        let isValid = false
    }

    return{error, isValid}
}

export default function Password({ session }) {

    useRedirectToLogin(session)

    const [user, setUser] = useState({})
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const [passwords, setPasswords] = useState("")
    const router = useRouter()

    useEffect(() => {
        setUser(session.user)
    }, [session.user])


    const handleChange = (e) => {

        const target = e.target
        const name = target.name
        const value = target.value

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleChange2 = (e) => {

        const target = e.target
        const name = target.name
        const value = target.value

        setPassword({
            ...password,
            [name]: value
        })
        alert(JSON.stringify(password))
    }


    const handlesubmit = async (e) => {
        e.preventDefault()

        const validate = validatePasswords(password, user.password)
        
        if(!validate.isValid) {
            setError(validate.error)
        }

        const resp = await updateUser(user, session.accessToken)

        router.push('/profile')
        // session.logout()
    }

    return (
        <Form onSubmit={handlesubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <div>
                    <Form.Control type="password" defaultValue="Password" name="password" onChange={handleChange}/>
                    <Form.Control style={{marginTop: "1rem"}} type="password" name="password" onChange={handleChange2}/>
                    {error && <div style={{color:'red'}}>{error}</div>}
                    <Button variant="primary" type="submit">Change</Button>
                    <Button onClick={() => router.push('/profile/settings')}>Back</Button>
                </div>
            </Form.Group>
        </Form>
    )
}
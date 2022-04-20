import { useRedirectToLogin } from "@lib/session"
import {useState, useEffect} from "react"
import { Button } from "react-bootstrap"
import {updateUser} from "@lib/api"
import {Form} from "react-bootstrap"
import { useRouter } from "next/router"

export default function ProfilePage({session}) {
    useRedirectToLogin(session)
    //const user = session.user

    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        setUser(session.user)
    },[])




    const submit = async (e) => {
        e.preventDefault()
        alert(JSON.stringify(user))
        const resp = await updateUser(user, session.accessToken)
        session.logout()
    }

    const handleChange = (e) => {

        const target = e.target
        const name = target.name
        const value = target.value



        setUser({
            ...user,
            [name]: value
        })
    }
    console.log(user)
    return (
        <div>
            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control type="email" plaintext readOnly  defaultValue={user?.email} name="email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" defaultValue="Password" name="password" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control defaultValue={user?.firstName} plaintext readOnly  name="firstName"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control defaultValue={user?.lastName} plaintext readOnly  name="lastName" />
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </div>
    )
}
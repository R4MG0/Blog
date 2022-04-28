import { useEffect, useState } from "react";
import {Form, FormControl, Card} from "react-bootstrap"
import Link from 'next/link'
import styles from './SearchBar.module.css'
import { Button } from "react-bootstrap";
import { deleteUser } from "@lib/api";
import { useRouter } from "next/router"


const profile = "https://banner2.cleanpng.com/20180525/fbc/kisspng-computer-icons-user-symbol-company-profile-5b084df3719b03.2755377715272708994653.jpg"

export default function FilterableList({session, users}) {

    const [newFilteredUser, setNewFilteredUser] = useState([])
    const router = useRouter()

    useEffect(() =>{
        setNewFilteredUser(users)
    },[])

    const handleChange = (e) => {
        const inputValue = e.target.value
        let someValue = users.filter(user => user.firstName.includes(inputValue))

        setNewFilteredUser(someValue)
    }

    async function kill(id){
        if(id === session.user.id){ 
            const resp = await deleteUser(id, session.accessToken)
            session.logout()
        }else{
            const resp = await deleteUser(id, session.accessToken)
            router.reload()
        }
    }

    return (
        <div>
            <Form className="d-flex" >
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleChange}

                />
            </Form>

             {
                session.user && 
                newFilteredUser.map((user) => {
                        return(
                            <div className={styles.user} key={user.id}>
                                
                                <Link href={`/users/${user.id}`} passHref>
                                    <Card style={{ width: '30rem', marginTop: '2rem' }} className={styles.card}>      
                                        <Card.Body>
                                            <div className={styles.profile}>
                                                <div className={styles.img}>
                                                {user.img ? <img src={user?.img}/> : <img src={profile}/>}
                                                </div>
                                                <div>
                                                <Card.Title className={styles.name}>{`${user.firstName} ${user.lastName}`} <br/> <Card.Subtitle style={{marginTop:'0.5rem'}}>{user.role}</Card.Subtitle></Card.Title>
                                                { session.user.role === 'admin' && <Button className={styles.button} variant="danger" onClick={(e) => kill(user.id)}>Delete</Button>}
                                                </div>
                                            </div>  
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        )
                    })
            }
                                    
        </div>
    );
}

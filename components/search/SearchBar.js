import { useEffect, useState } from "react";
import {Form, FormControl, Card} from "react-bootstrap"
import Link from 'next/link'
import styles from './SearchBar.module.css'

const profile = "https://banner2.cleanpng.com/20180525/fbc/kisspng-computer-icons-user-symbol-company-profile-5b084df3719b03.2755377715272708994653.jpg"

export default function FilterableList({session, users}) {

    const [newFilteredUser, setNewFilteredUser] = useState([])


    useEffect(() =>{
        setNewFilteredUser(users)
    },[])

    const handleChange = (e) => {
        const inputValue = e.target.value
        // alert(inputValue)
        // alert(JSON.stringify(users))
        let someValue = users.filter(user => user.firstName.includes(inputValue))

        setNewFilteredUser(someValue)
    }

    return (
        <div>
            <Form className="d-flex">
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
                            <div className={styles.user}>
                                <Link href="/">
                                    <Card style={{ width: '30rem', marginTop: '2rem' }} className={styles.card}>      
                                        <Card.Body>
                                            <div className={styles.profile}>
                                                <div className={styles.img}>
                                                {user.img ? <img src={user?.img}/> : <img src={profile}/>}
                                                </div>
                                                <Card.Title className={styles.name}>{`${user.firstName} ${user.lastName}`}</Card.Title>
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

import { useRedirectToLogin } from "@lib/session"
import { useEffect, useState } from "react"

export default function ProfilePage({session}) {

    useRedirectToLogin(session)

    return (
        <div>
            <pre style={{color: '#000'}}>{JSON.stringify(session, null, 4)}</pre>
        </div>
    )
}
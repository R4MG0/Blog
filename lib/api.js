const URL = "http://localhost:3001"

export async function login({ email, password }) {
    const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ 
            email: email,
            password: password
        })
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function register({ email, password, firstName, lastName}) {
    const response = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email, password, firstName, lastName})
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getAllPosts() {
    const response = await fetch(`${URL}/posts`)
    const posts = await response.json();

    if (!response.ok){
        return Promise.reject(response.json)
    }
    return(posts)   
}



export async function getPostById(id) {
    const response = await fetch(`${URL}/${id}`)
    const posts = await response.json();
    return(posts)
}

export async function getUserById(id) {
    const response = await fetch(`${URL}/users/${id}`)
    const users = await response.json();
    return(users.firstName)
}

export async function createPost(post, token) {
    
    const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "authorization":`Bearer ${token}`
        },
        body : JSON.stringify(post)
    })

    if(!response.ok) {

        console.log(response)

        throw new Error(response.statusText)

    }
    const data = await response.json()
    return data

}

export async function updatePost(post, token) {
    const response = await fetch(`${URL}/${post.id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "authorization":`Bearer ${token}`
        },
        body: JSON.stringify(post)
    })

    if(!response.ok) {    
        throw new Error(response.statusText)
    }
    
}

export async function deletePost(id, token) {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "authorization":`Bearer ${token}`
        }
        
    })
    if(!response.ok) {    
        throw new Error(response.statusText)
    }
}
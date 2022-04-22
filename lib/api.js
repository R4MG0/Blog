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
    const response = await fetch(`${URL}/posts/${id}`)
    const posts = await response.json();
    return(posts)
}

export async function getUserById(id) {
    const response = await fetch(`${URL}/users/${id}`)
    const users = await response.json();
    return(users.firstName)
}

export async function createPost(post, token) {
    
    const response = await fetch(`${URL}/posts`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "authorization":`Bearer ${token}`
        },
        body : JSON.stringify(post)
    })

    if(!response.ok) {

        console.log(response)

        return Promise.reject(response.json)

    }
    const data = await response.json()
    return data

}

export async function updatePost(post, token) {
    const response = await fetch(`${URL}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "authorization":`Bearer ${token}`
        },
        body: JSON.stringify(post)
    })

    if(!response.ok) {    
        return Promise.reject(response.json)
    }
    
}


export async function updateProfilePic(id, img, token){

    const response = await fetch(`${URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify({ img })
    })
    if(!response.ok) {
        return Promise.reject(response)
    }
    const data = await response.json()
    return data
}

export async function updateUser(user, token){

    const tmp = {"email": user.email, "password": user.password, "firstName": user.firstName, "lastName": user.lastName}

    const response = await fetch(`${URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    if(!response.ok) {
        return Promise.reject(response)
    }
    return response.json()

}

export async function putComment (comment, id, token) {
    const comments = await getPostById(id);
    const realcomments = comments.comments;

    realcomments.push(comment)
    const ding = {
        ...comments,
        "comments": realcomments
    }

    const response = await fetch(`${URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(ding)
    })

}

export async function deletePost(id, token) {
    const response = await fetch(`${URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "authorization":`Bearer ${token}`
        }
        
    })
    if(!response.ok) {    
        return Promise.reject(response.json)
    }
}

/** Import des modules nécessaires */
import Axios from './caller.service'
import { accountService } from './account.service'
// appel service API

// fonction recuperation tout les post
let getAllPosts = () => {
    return Axios.get('/api/posts/')
}

// fonction recuperation d'un post
let getPost = (post) => {
    return Axios.get('/api/posts/', post)
}

// fonction creation d'un post
let createPost = (formData) => {
    return Axios.post('/api/posts/', formData)
}


// fonction suppression d'un post
let deletePost = (data) => {
    return Axios.delete('/api/posts/' + data)
}

// fonction like d'un post
let likedPost = (postId, likes) => {
    const profil = accountService.tokenDecode(accountService.getToken())
    return Axios.post('/api/posts/like', {
        _id: postId,
        likes: likes,
        userId: profil.userId,
    })
}

// fonction modifier un post
let modifyPost = (formData) => {
    return Axios.put('/api/posts/', formData)
}

// export des fonction pour les utiliser dans les pages
export const postService = {
    getAllPosts,
    getPost,
    createPost,
    likedPost,
    deletePost,
    modifyPost
}


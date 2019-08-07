import {API_BASE_URL,ACCESS_TOKEN} from '../constants';
import axios from 'axios';

//Api utils are reffering only to functions that don't receive any usefull data that should be injected into the app state.
export const request = options=>{

    const headers = new Headers({
        'Content-Type':'application/json'
    });

    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append('Authorization','Bearer '+localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers:headers};
    //Create a single object for comodity
    options = Object.assign({},defaults,options);

    return fetch(options.url,options).then(response=>response.json().then(json=>{
        if(!response.ok){
            return Promise.reject(json);
        }
        return json;
    }))
};

    export function signup(signUpRequest){
        return request({
            url:API_BASE_URL+'/auth/signup',
            method:'POST',
            body:JSON.stringify(signUpRequest)
        })
    };

    export function login(loginRequest){
        return request({
            url:API_BASE_URL+'/auth/signin',
            method:'POST',
            body:JSON.stringify(loginRequest)
        })
    }

    export function checkUsernameAvailability(username){
        return request({
            url:API_BASE_URL+'/user/checkUsernameAvailability?username='+username,
            method:'GET'
        })
    }

    export function checkEmailAvailability(email){
        return request({
            url:API_BASE_URL+'/user/checkEmailAvailability?email='+email,
            method:'GET'
        })
    }

    export function createPost(post){
        return request({
            url:API_BASE_URL+'/posts',
            method:'POST',
            body:JSON.stringify(post)
        })
    }

    export function deletePost(id){
        return request({
            url:API_BASE_URL+'/posts/'+id,
            method:'DELETE'
        })
    }

    export function updatePost(id,post){
        return request({
            url:API_BASE_URL+'/posts/'+id,
            method:'PUT',
            body:JSON.stringify(post)
        })
    }

    export function castVote(id,type){
        return request({
            url:API_BASE_URL+`/posts/${id}/votes?type=${type}`,
            method:'POST'
        })
    }

    export function createComment(id,comment){
        return request({
            url:API_BASE_URL+`/posts/${id}/comments`,
            method:'POST',
            body:JSON.stringify(comment)
        })
    }

    export function savePost(id){
            return request({
            url:API_BASE_URL+`/user/saved/${id}`,
            method:'POST'
        })
    }

    const uploadImage=(formData)=>{
        return axios.post(`${API_BASE_URL}/uploadImage`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
               'Authorization':`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
              }
         } )
    }

    export const updateUser=(updateRequest)=>{
        return request({
            url:`${API_BASE_URL}/user?name=${updateRequest.name}&username=${updateRequest.username}`,
            method:'PUT',
        })
    }

    export const uploadMediaPost=(formData,post)=>{
        
            return uploadImage(formData).then(json=>{
             const postRequest = {...post,image_id:json.data.id};
             return createPost(postRequest)
         });    

    }

    export const updateProfilePicture=(formData)=>{

        return uploadImage(formData).then(json=>{
            return request({
                url:`${API_BASE_URL}/user/uploadProfileImage/${json.data.id}`,
                method:'POST',
            })
        })
      }

    export const createSpace=(space)=>{
        return request({
            url:`${API_BASE_URL}/spaces`,
            method:'POST',
            body:JSON.stringify(space)
        })
    }
    

    
    
    
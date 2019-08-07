import {API_BASE_URL,DEFAULT_COMMENT_PAGE_SIZE, ACCESS_TOKEN} from '../constants';
import axios from 'axios';
import {request}  from '../util/ApiUtils';



export const fetchPostList =(page,size)=>async dispatch =>{
const response = await request({
    url: API_BASE_URL+`/posts?page=${page}&size=${size}`,
    method:'GET',
});
dispatch({payload:response,type:'FETCH_ALL_POSTS'})
}

export const castVote=(id,type)=>async dispatch=>{
    const response = await request({
        url:API_BASE_URL+`/posts/${id}/votes?type=${type}`,
        method:'POST',
    });
    dispatch({type:'CAST_VOTE',payload:response})
}

export const fetchComments=(id,page,size=DEFAULT_COMMENT_PAGE_SIZE)=>async dispatch=>{
    const response = await request({
        url:API_BASE_URL+`/posts/${id}/comments?page=${page}&size=${size}`,
        method:'GET'
    });
    dispatch({
        type:'FETCH_COMMENTS',payload:response
    })
} 

export const getCurrentUser=()=>async dispatch=>{
    const response = await request({url:API_BASE_URL+'/user/me',method:'GET'})
    dispatch({type:'GET_CURRENT_USER',payload:response})
}

export const getAllSpaces=(page=0,size=15)=>async dispatch=>{
    const response = await request({url:API_BASE_URL+`/spaces?page=${page}&size=${size}`,method:'GET'})
    dispatch({type:'FETCH_SPACES',payload:response})
}

export const getPostsBySpace=(space,page=0,size=5)=>async dispatch=>{
    const response = await request({
        url:API_BASE_URL+`/posts/bySpace/${space}?page=${page}&size=${size}`,
        method:'GET'
    });
    dispatch({type:'FETCH_POSTS_BY_SPACE',payload:response})
}

export const searchPostsByTitleContaining=(title,page=0,size=5,username)=>async dispatch=>{
    const response = await request({
        url:API_BASE_URL+`/posts/search?title=${title}&page=${page}&size=${size}`,
        method:'GET',
    });
    dispatch({type:'SEARCH_POSTS',payload:response})
}

export const getUpvotedByUserPosts=(page=0,size=4,username)=>async dispatch=>{
    const response = await request({
        url:API_BASE_URL+`/user/positive/${username}?page=${page}&size=${size}`,
        method:'GET'
    });
    dispatch({type:'FETCH_UPVOTED_BY_USER',payload:response})
}

export const getDownvotedByUserPosts=(page=0,size=4,username)=>async dispatch=>{
    const response = await request({
        url:API_BASE_URL+`/user/negative/${username}?page=${page}&size=${size}`,
        method:'GET'
    });
    dispatch({type:'FETCH_DOWNVOTED_BY_USER',payload:response})
}

export const fetchMyPosts=(page=0,size=5,username)=>async dispatch=>{
    const response = await request({
        url:API_BASE_URL+`/user/myPosts/${username}?page=${page}&size=${size}`,
        method:'GET'
    })
    dispatch({type:'FETCH_MY_POSTS',payload:response})
}

export const fetchSavedPosts=(username)=>async dispatch=>{
    const response = await request({
        url:API_BASE_URL+`/user/saved/${username}`,
        method:'GET'
    });
    dispatch({type:'FETCH_SAVED_POSTS',payload:response})
}

export const anullCurrentUser=()=>{
    return{
        type:'LOGOUT',
    }
}

export const updatePostState=(post,i,type)=>{
    return{
        type:`UPDATE_POST_${type}`,
        payload:post,
        index:i
    }
}

export const getSpaceByName=(name)=>async dispatch=>{
    const response = await request({
        url:`${API_BASE_URL}/spaces/byName/${name}`,
        method:'GET'
    });
    dispatch({type:'FETCH_SPACE',payload:response})
}

export const getUserInfo=(username)=>async dispatch=>{
    const response = await request({
        url:`${API_BASE_URL}/user/info/${username}`,
        method:'GET'
    });
    dispatch({type:'FETCH_USER_INFO',payload:response})
}

const getImage=(url)=>{
    return axios.get(url,{responseType:'arraybuffer',
    headers:{'Authorization':'Bearer '+localStorage.getItem(ACCESS_TOKEN)}
}).then((response) => {
    let image = new Buffer(response.data,'binary').toString('base64')
    return `data:image/jpeg;base64,${image}`;
  });
}

export const getMyImage=()=>async dispatch=>{
    const response = await getImage(`${API_BASE_URL}/user/me/avatar`);
    if(response.status===404){
        dispatch({type:'FETCH_MY_IMAGE',payload:null})
    }
    dispatch({type:'FETCH_MY_IMAGE',payload:response})
}

export const getAvatarPic=(username)=>async dispatch=>{
   const response = await getImage(`${API_BASE_URL}/user/getProfileImage/${username}`);
   if(response.status==='404'){
       dispatch({type:'FETCH_IMAGE',payload:null})
   }
   dispatch({type:'FETCH_IMAGE',payload:response});
}







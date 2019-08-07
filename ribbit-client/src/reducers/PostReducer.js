const updatePostState=(state,action)=>{
    const newContent =[...state.content];
    newContent[action.index]=action.payload;
        return{...state,content:newContent}
}


const getPostsState=(state,action)=>{
    if((state.page&&state.page!==action.payload.page)||action.payload.page===1)
            {return {...action.payload,content:state.content?state.content.concat(action.payload.content):action.payload.content}}
            else{return action.payload};
}

export const allPosts = (state={},action)=>{
    switch(action.type){
        case "FETCH_ALL_POSTS":return getPostsState(state,action);
        case "UPDATE_POST_ALL_POSTS": return updatePostState(state,action);
        default:return state;
    }
}

export const myPosts=(state={},action)=>{
    switch(action.type){
        case 'FETCH_MY_POSTS':return getPostsState(state,action);
        case 'UPDATE_POST_MY_POSTS':return updatePostState(state,action);
        default:return state;
    }
}

export const upvoted=(state={},action)=>{
    switch(action.type){
        case 'FETCH_UPVOTED_BY_USER':return getPostsState(state,action);
        case 'UPDATE_POST_UPVOTED':return updatePostState(state,action)
        default:return state;
    }
}

export const downvoted=(state={},action)=>{
    switch(action.type){
        case 'FETCH_DOWNVOTED_BY_USER':return getPostsState(state,action);
        case 'UPDATE_POST_DOWNVOTED':return updatePostState(state,action)
        default:return state;
    }
}

export const saved=(state={},action)=>{
    switch(action.type){
        case 'FETCH_SAVED_POSTS':return getPostsState(state,action);
        case 'UPDATE_POST_SAVED':return updatePostState(state,action);
        default:return state;
    }
}

export const search=(state={},action)=>{
    switch(action.type){
        case 'SEARCH_POSTS':return getPostsState(state,action);
        case 'UPDATE_POST_SEARCH':return updatePostState(state,action)
        default:return state;
    }
}

export const bySpace=(state={},action)=>{
    switch(action.type){
        case 'FETCH_POSTS_BY_SPACE':return getPostsState(state,action);
        case 'UPDATE_POST_SPACE':return updatePostState(state,action)
        default:return state;
    }
}
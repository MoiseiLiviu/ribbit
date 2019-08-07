export const profileImage = (state='',action)=>{
    switch(action.type){
        case 'FETCH_IMAGE':return action.payload;
        default:return state;
    }
}

export const myImage=(state='',action)=>{
    switch(action.type){
        case 'FETCH_MY_IMAGE':return action.payload;
        default:return state;
    }
}
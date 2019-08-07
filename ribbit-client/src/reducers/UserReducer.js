export const currentUser = (state={},action)=>{
    switch(action.type){
        case 'GET_CURRENT_USER':return action.payload;
        case 'LOGOUT':return {};
        default:return state;
    }
}

export const userInfo = (state={},action)=>{
    switch(action.type){
        case 'FETCH_USER_INFO':return action.payload;
        default:return state;
    }
}
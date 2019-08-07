export const allSpaces=(state=[],action)=>{
    switch(action.type){
        case 'FETCH_SPACES':return action.payload;
        default:return state;
    }
}

export const space=(state=null,action)=>{
switch(action.type){
    case'FETCH_SPACE':return action.payload;
    default:return state;
}
}
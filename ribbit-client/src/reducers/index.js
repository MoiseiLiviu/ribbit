import {combineReducers} from 'redux';
import { myPosts,saved,search,upvoted,downvoted,allPosts,bySpace} from './PostReducer';
import CommentsReducer from './CommentsReducer';
import {currentUser,userInfo} from './UserReducer';
import {space,allSpaces} from './SpacesReducer';
import {myImage,profileImage} from './ImageReducer';

import 'antd/dist/antd.css';

export default combineReducers({
comments:CommentsReducer,
currentUser,
userInfo,
allSpaces,
space,
allPosts,
myPosts,
saved,
downvoted,
upvoted,
search,
bySpace,
myImage,
profileImage
});
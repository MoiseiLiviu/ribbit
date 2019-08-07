import React,{Component} from 'react';
import { connect } from 'react-redux';

import PostList from '../PostList/PostList';

import {getUserInfo,getAvatarPic,fetchMyPosts,fetchSavedPosts,getDownvotedByUserPosts,getUpvotedByUserPosts} from '../../actions';

import './Profile.scss';
import {Button,notification} from 'antd';
import { updateProfilePicture,updateUser} from '../../util/ApiUtils';

class Profile extends Component{

state = {
        active:'myPosts',
        edit:false,
        name:'',
        username:'',
        imageEdit:false,
        file:null}

async componentDidMount(){
    const username = this.props.match.params.username;
    await this.props.getUserInfo(username);
    this.setState({name:this.props.userInfo.name,username:this.props.userInfo.username})
    this.props.fetchMyPosts(0,4,username);
    this.props.getUpvotedByUserPosts(0,4,username);
    this.props.fetchSavedPosts(username);
    this.props.getDownvotedByUserPosts(0,4,username);
    this.props.getAvatarPic(username);
}

getPosts(){
    switch(this.state.active){
        case 'myPosts':return this.props.myPosts;
        case 'saved':return this.props.saved;
        case 'upvoted':return this.props.upvoted;
        case 'downvoted':return this.props.downvoted;
        default:return null;
    }
}

//Returns fetch action for the fetchMore function inside the PostList component.
getFetchFunction(){
    switch(this.state.active){
        case 'myPosts':return this.props.fetchMyPosts;
        case 'saved':return this.props.fetchSavedPosts;
        case 'upvoted':return this.props.getUpvotedByUserPosts;
        case 'downvoted':return this.props.getDownvotedByUserPosts;
        default:return null;
    }
}

handleSectionChange(section){
    this.setState({active:section});
}

//Showing image preview once the file input onChange event is triggered and setting the state.file to the particular image.
handleProfileImageUpdate(e){
    e.preventDefault();
    var formData = new FormData();
       var imagefile = document.querySelector('#file');
       formData.append("file", imagefile.files[0]);
       updateProfilePicture(formData).then(()=>
           this.props.getAvatarPic()).then(()=>{
           this.setState({file:null,edit:false});
           notification.success({
               message:'Ribbit app',
               description:'Profile image updated successfully.'
           });
       }).catch(()=>{
        notification.error({
            message:'Ribbit app',
            description:'Error updating the profile image'
        })
       });
}

handleUserUpdate(){
    const updateRequest = {"name":this.state.name,"username":this.state.username}
    updateUser(updateRequest).then(()=>{
        this.props.getCurrentUser();
        this.setState({edit:false});
        notification.success({
            message:'Ribbit App',
            description:'Successfully updated user'
        })
    }).catch(err=>notification.error({
        message:'Ribbit App',
        description:'Error whilte updating user'
    }))
}

//Renders the profile info section/editing section depending on the state.edit boolean value toggled by button in the info section.
renderProfileInfoSection(){
    const {username,name,totalDownvotes,totalUpvotes,postsCount} = this.props.userInfo;
    if(!this.state.edit){
        return(
        <div className='profile__info'>  
        <div className='profile__info__img__wrapper'>   
         <img alt='profile' className='profile__info__img' src={this.props.profileImage?this.props.profileImage:require('../../img/avatar.png')}/>
        </div>
         <h2 className='profile__info__stats'><i className='fas fa-angle-double-right'/> {username}</h2>
         <h2 className='profile__info__stats'><i className='fas fa-angle-double-right'/> Name:{name}</h2> 
         <h2 className='profile__info__stats'><i className='fas fa-angle-double-right'/> Posts created:{postsCount}</h2>
         <h2 className='profile__info__stats'><i className='fas fa-angle-double-right'/> Total upvotes:{totalUpvotes}</h2>
         <h2 className='profile__info__stats'><i className='fas fa-angle-double-right'/> Total downvotes:{totalDownvotes}</h2>
         {this.props.currentUser.username===this.props.match.params.username?<Button onClick={()=>this.setState({edit:true})} type='primary'>Edit profile</Button>:null}          
   </div>)
    }
    else if(this.state.edit){
        
        return(
        <div className='profile__info'>  
        <div className='profile__info__img__wrapper'>    
          <img alt='profile' className='profile__info__img' src={this.props.profileImage?this.props.profileImage:require('../../img/avatar.png')}/>
         </div>
         <Button type='primary' onClick={()=>this.setState({imageEdit:true})}>Edit image</Button>
         {this.state.imageEdit?<form className='upload-form' enctype='multipart/form-data' onSubmit={(e)=>this.handleProfileImageUpdate(e)}>
           <input className='profile__info__input' type="file" id="file" name="file" onChange={(e)=>this.setState({file:URL.createObjectURL(e.target.files[0])})}/>
           {this.state.file?<img alt='preview' className='preview-image' src={this.state.file}/>:null}
           <Button htmlType='submit' type='primary'>Submit</Button>
         </form>:null}
         <div>
           <input className='profile__info__input' onChange={(e)=>this.setState({username:e.target.value})} value={this.state.username}  placeholder={username}/>
           <input className='profile__info__input' onChange={(e)=>this.setState({name:e.target.value})} value={this.state.name}  placeholder={name}/>
           <Button type='primary' style={{marginLeft:'2rem',margin:'1.5rem 2rem'}} onClick={()=>this.handleUserUpdate()}>Submit</Button>
         </div>
           <h2 className='profile__info__stats'><i className='fas fa-angle-double-right'/> Posts created:{postsCount}</h2>
           <h2 className='profile__info__stats'><i className='fas fa-angle-double-right'/> Total upvotes:{totalUpvotes}</h2>
           <h2 className='profile__info__stats'><i className='fas fa-angle-double-right'/> Total downvotes:{totalDownvotes}</h2>
       </div>)
    }
}

    render(){
        const posts = this.getPosts();
        return(
          <div className='profile'>
            {this.renderProfileInfoSection()}
            <div className='profile__posts'>
             <div className='profile__posts__selector'>
                <Button className='profile__posts__selector__btn' onClick={()=>this.handleSectionChange('myPosts')}>My posts</Button>
                <Button className='profile__posts__selector__btn' onClick={()=>this.handleSectionChange('downvoted')}>Downvoted Posts</Button>
                <Button className='profile__posts__selector__btn' onClick={()=>this.handleSectionChange('saved')}>Saved posts</Button>
                <Button className='profile__posts__selector__btn' onClick={()=>this.handleSectionChange('upvoted')}>Upvoted posts</Button>
              </div>
              {posts.content?<PostList username={this.props.match.params.username} fetch={this.getFetchFunction()} type={this.state.active} posts={posts}/>:null}
            </div>
         </div>
        )
    }
}

const mapStateToProps=({profileImage,myImage,userInfo,myPosts,saved,upvoted,downvoted,currentUser})=>{
    return{profileImage,myImage,userInfo,myPosts,saved,upvoted,downvoted,currentUser}
}

export default connect(mapStateToProps,{getUserInfo,getAvatarPic,fetchMyPosts,fetchSavedPosts,getDownvotedByUserPosts,getUpvotedByUserPosts})(Profile);

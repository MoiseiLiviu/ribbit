import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {castVote,savePost,createComment} from '../../util/ApiUtils';
import {updatePostState,fetchMyPosts} from '../../actions';

import './PostList.scss';
import '../../styles/variables.scss';

import CommentList from '../CommentList/CommentList';
import { notification ,Button} from 'antd';

class PostList extends Component{

constructor(){
    super();
    this.state = {
        active:[],
        visibleForm:false,
        text:''
    };
    this.activateComments = this.activateComments.bind(this);
}

//Action used for returning the updated version of the post after voting/commenting.
getActionType(){
    switch(this.props.type){
        case 'home':return 'ALL_POSTS';
        case 'myPosts':return 'MY_POSTS';
        default:return this.props.type.toUpperCase();
    }
}

createComment(id,i){

    createComment(id,{text:this.state.text}).then((updatedPost)=>{
        notification.success({
            message:'Ribbit App',
            description:'Comment created successfully'
        });
        this.props.updatePostState(updatedPost,i,this.getActionType());
        this.setState({visibleForm:false})
        }
    ).catch(err=>alert(err));
}


castVote(id,type,e,i){
e.persist();

castVote(id,type).then((updatedPost)=>{
    e.target.style.color = 'orange';
    this.props.updatePostState(updatedPost,i,this.getActionType())
    
}).catch((err)=>notification.error({
    message:'Ribbit App',
    description:err.message
}))
}

//Make the comment list for the particular post visible
activateComments(i){
   const activeIndex = [...this.state.active]
   this.setState((prevState=>{
       activeIndex[i]=prevState.active[i]?!prevState.active[i]:true;
       return{
           active:activeIndex
       }
   }))
}

//Fetches the next page for the particular type of post
fetchMore(){

    if(this.props.type==='search'){
       this.props.fetch(this.props.match.params.title,this.props.posts.page+1,4);
    }
    else if(this.props.username){
        this.props.fetch(this.props.posts.page+1,4,this.props.username);
    }
    else{
     this.props.fetch(this.props.posts.page+1,4);
    }
}

savePost(postId,e){
    e.persist();
savePost(postId).then(()=>e.target.style.color = 'orange')
                .catch((err)=>alert(err.message))

}

closePostWindow(e){

   e.target.parentNode.parentNode.style.display='none';
}

    renderPostList(){
    return this.props.posts.content.map(({post,upvotes,downvotes,commentsNumber,creatorUsername,base64},i)=>{
       return(
      <div className='fade-in' key={i}>
        <div className='post'>
            <button onClick={(e)=>this.closePostWindow(e)} className='post__window-close'><i className='fas fa-window-close'/></button>
            <div className='post__voting'>
                <div className='post__votes post__votes__upvotes'>
                  {upvotes}
                  <button onClick={(e)=>{this.castVote(post.id,"positive",e,i)}} className='post__voting btn'><i className='fas fa-arrow-alt-circle-up fa-2x'/></button>
                </div>
                <div className='post__votes post__votes__downvotes'>
                 {downvotes}
                <button onClick={(e)=>this.castVote(post.id,"negative",e)} className='post__voting btn'><i className='fas fa-arrow-alt-circle-down fa-2x'/></button>
              </div>
            </div>
            <div className='post__info'>
              <span className='post__meta'>
                <h3 className='post__meta__spaces'>{post.spaces.map(space=><Link key={space.id} to={`/posts/${space.name}`}>{space.name},</Link>)}*</h3>
                <h3 className='post__meta__data'>Posted by:<Link className='post__meta__data' style={{color:'black'}} to={`/profile/${creatorUsername}`}>{creatorUsername}</Link><span style={{fontWeight:'200',color:'black'}}> || </span>Created at:{post.createdAt.substring(0,10)}</h3>
              </span>
              <h2 className='post__title'>{post.title}</h2>
              {base64!==null?<img className='post__img' alt={post.title+'image'} src={`data:image/PNG;base64,${base64}`}/>:null}
              <h3 className='post__description'>{post.description}</h3>
              <span className='post__footer'>
                  <div className='post__footer__component'><button className='post__footer__btn' onClick={()=>this.activateComments(i)}><i className='fas fa-comment'/>{commentsNumber} Comments</button></div>
                  <div className='post__footer__component'><button className='post__footer__btn' onClick={(e)=>this.savePost(post.id,e)}><i className='fas fa-star'/>Save</button></div>
                  <div className='post__footer__component'><i className='fas fa-link'/>Share</div>
                  <div><button className='post__footer__btn'><i className='fas fa-ellipsis-h'/></button></div>
              </span>
            </div>
            {this.state.active[i] && <div>
                <div className='ui comments'>
          {this.state.visibleForm && 
               <div className='ui reply form'>
                  <div className='field'>
                    <textarea onChange={(e)=>this.setState({text:e.target.value})} value={this.state.text}/>
                  </div>
                  <Button type='primary' onClick={()=>this.createComment(post.id,i)}>Submit</Button>
                </div>}
                 <Button type='primary' onClick={()=>this.setState(prevState=>{return{visibleForm:!prevState.visibleForm}})}>Create comment</Button>
                </div>
                <CommentList postId={post.id}  commentsNumber={commentsNumber}/>
                </div>}
        </div>
        </div>)
    
  })
}

    render(){
    if(this.props.posts.content.length>0){
return(
    <div style={{width:'50rem'}}>
        {this.renderPostList()}
        {!this.props.posts.last?<Button style={{margin:'0 auto',display:'block',marginBottom:'1.5rem'}} type='primary' onClick={()=>this.fetchMore()}>Load more</Button>:null}
    </div>
)}
else if(this.props.posts.content.length===0){
    return(
        <div className='posts-not-found'>
            <span>No posts found<i className='fas fa-frown fa-2x'/></span>
        </div>
    )
}
else{return(<div>
     Loading...
 </div>)
 }
    }
}

export default connect(null,{updatePostState,fetchMyPosts})(PostList);



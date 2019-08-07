import React,{Component} from 'react';
import {connect} from 'react-redux';

import './CommentList.scss';
import {Button} from 'reactstrap';

import {fetchComments} from '../../actions';

class CommentList extends Component{

constructor(){
    super();
    this.state = {
        page:0,
        size:3,
        comments:[],
        visibleForm:false,
    };
}

async componentDidMount(){

const {page,size} = this.state;

 await this.props.fetchComments(this.props.postId,page,size);
 const comments = this.props.comments.content;
this.setState({comments:comments});
}

//If the post was updated (user commented) and the commentsNumber changed, refetch the comment list.
async componentDidUpdate(prevProps){
    if(this.props.commentsNumber!==prevProps.commentsNumber){
        await this.props.fetchComments(this.props.postId,this.state.page,this.state.size);
        this.setState({comments:this.props.comments.content})
    }
}

async fetchMore(){
    this.setState((prevState=>{
        return{
            page:prevState.page+1,
        }
    }));
    await this.props.fetchComments(this.props.postId,this.state.page,this.state.size);
    const comments = this.props.comments.content;
    this.setState(prevState=>{
        return{
            comments:[...prevState.comments,...comments]
        }
    })
}

renderCommentList(){
    return this.state.comments.map(({comment,userSummary},i)=>{
        return(
            <div key={i} className="comment">
             <a href='/' className="avatar">
               <img src={require('../../img/avatar.png')} alt='da' className='comment__avatar'/>
             </a>
            <div className="content">
              <a href='/' className="author">{userSummary.username}</a>
              <div className="metadata">
                 <span className="date">{comment.createdAt}</span>
              </div>
              <div className="text">
                {comment.text}
            </div>
           </div>
           <div className='ui divider'></div>
      </div>
        )
    })
}

    render(){
        if(this.state.comments.length>0){
        return(
      <div className='ui comments'>
        {this.renderCommentList()}
       {!this.props.comments.last && <Button onClick={()=>this.fetchMore()}>Load more</Button>}
      </div>)
    }
    else if(this.props.comments.totalElements === 0){
        return(
         <div>
            <div>No comments.</div>
            {this.state.visibleForm && 
        <div className='ui reply form'>
          <div className='field'>
              <textarea onChange={(e)=>this.setState({text:e.target.value})} value={this.state.text}/>
          </div>
          <button onClick={()=>this.createComment(this.props.postId)}>Submit</button>
        </div>}
       <Button onClick={()=>this.setState(prevState=>{return{visibleForm:!prevState.visibleForm}})}>Create comment</Button>
        </div>
        )
    }
    else{
        return(
            <div>Loading...</div>
        )
    }
}
};

const mapStateToProps=({comments})=>{
      return{comments:comments}
}

export default connect(mapStateToProps,{fetchComments})(CommentList);
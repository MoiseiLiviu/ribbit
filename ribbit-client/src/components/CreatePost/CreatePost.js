import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {getAllSpaces} from '../../actions';
import {createPost,uploadMediaPost} from '../../util/ApiUtils';

import './CreatePost.scss';
import { notification,Select,Button} from 'antd';

const {Option} = Select;

class CreatePost extends Component{

    constructor(props){
        super(props);
        this.state={
            currentInput:'post',
            title:'',
            description:'',
            content:'',
            spaces:[]
        }
    this.getInputBox = this.getInputBox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSpacesInputChange = this.handleSpacesInputChange.bind(this);
    }

    componentDidMount(){
      this.props.getAllSpaces();
    }

handleInputChange(e){
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({[name]:value});
}

handleImageSubmit(e){
    e.preventDefault();

    const post = {
        title:this.state.title,
        description:this.state.description,
        content:this.state.content,
        spaces:this.state.spaces
    }

    var formData = new FormData();
       var imagefile = document.querySelector('#file');
       formData.append("file", imagefile.files[0]);
       uploadMediaPost(formData,post).then(()=>{
           notification.success({
               message:'Ribbit app',
               description:'Post created successfully.'
           });
           this.props.history.push('/');
       }).catch(()=>{
        notification.error({
            message:'Ribbit app',
            description:'Error creating post'
        })
       });
}

handleSpacesInputChange(value){
    if(this.state.spaces.length<5){
    value.forEach(space=>this.setState(()=>{
        const newSpaces = [...this.state.spaces];
        newSpaces.push(this.props.allSpaces[space].name)
        return {spaces:newSpaces}
    }))
} 
    else{
        notification.error({
            message:'Ribbit app',
            description:'Maximum amount of spaces selected'
        })
    }
}

getInputBox(){
    
  if(this.state.currentInput==='post'){
      return(
          <div className='input-box'>
            <form onSubmit={(e)=>this.handleSubmit(e)}>
             {this.props.allSpaces?
              <Select style={{marginBottom:'2rem'}} maxTagCount={5} placeholder='Select the related spaces' mode='multiple' onChange={this.handleSpacesInputChange}>
                  {this.props.allSpaces.map(space=>
                    <Option key={space.id}>{space.name}</Option>
                  )}
              </Select>:null
             }
              <input onChange={(e)=>this.handleInputChange(e)} value={this.state.title} name='title' className='input-box__field' placeholder='Post title'/>
              <input onChange={(e)=>this.handleInputChange(e)} value={this.state.description} name='description' placeholder='Description(optional)' className='input-box__field'/>
              <textarea onChange={(e)=>this.handleInputChange(e)} value={this.state.content} name='content' className='input-box__field' placeholder='...'/>
              <Button type='primary' htmlType='submit'>Submit</Button>
            </form>
          </div>
      )
  }
  else if(this.state.currentInput==='photo'){
      return(
        <form className='upload-form' enctype='multipart/form-data' onSubmit={e=>this.handleImageSubmit(e)}>
           <input name='title' onChange={(e)=>this.handleInputChange(e)} value={this.state.title} placeholder='Title'/>
           <input name='description' onChange={(e)=>this.handleInputChange(e)} value={this.state.description} placeholder='Description(optional)'/>
           <input type="file" id="file" name="file"/>
           <Button type='primary' htmlType='submit'>Submit</Button>
        </form>
      )
  }
}

handleSubmit(e){
e.preventDefault();
    const post = {
        title:this.state.title,
        description:this.state.description,
        content:this.state.content,
        spaces:this.state.spaces,
        image_id:''
    }

    createPost(post).then(()=>{
        notification.success({
            message:'Ribbit app',
            description:'Post created successfully.'
        });
        this.props.history.push('/');
    }).catch(()=>{
     notification.error({
         message:'Ribbit app',
         description:'Error creating post'
     })
    });
}

    render(){
        console.log(this.state.spaces);
        return(
      <div>
        <div className='post-creator__container'>
            <div className='post-creator'>
                <h2 className='post-creator__title'>Create a new post</h2>
                <div className='ui divider'></div>
                <div className='btn-container'>
                    <button className='post-creator__selector' onClick={()=>this.setState({currentInput:'post'})}><i className='fas fa-sticky-note'/>Post</button>
                    <button className='post-creator__selector' onClick={()=>this.setState({currentInput:'photo'})}><i className='fas fa-photo-video'/>Photo</button>
                </div>
                
                {this.getInputBox()}
                
            </div>
            <div className='post-creator__sidebar'>
                <h2 className='post-creator__sidebar__heading'><img alt='toad' className='post-creator__sidebar__icon' src={require('../../img/toad.png')}/>Posting to Ribbit:</h2>
                <h3>1.Try avoiding duplicates</h3>
                <div className='ui divider'/>
                <h3>2.Respect the general accepted social rules,as in real life</h3>
                <div className='ui divider'/>
                <h3>3.Adopt a positive attitude.</h3>
                <div className='ui divider'/>
                <h3>4.Have fun!</h3>
                <div className='ui divider'/>
            </div>
        </div>
      </div>
        )
    }
}

const mapStateToProps=({allSpaces})=>{
    return {allSpaces};
}

export default withRouter(connect(mapStateToProps,{getAllSpaces})(CreatePost));
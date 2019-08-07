import React,{Component} from 'react';
import {connect} from 'react-redux';

import './Home.scss'
import {Button} from 'antd';

import PostList from '../PostList/PostList';
import SideBar from '../SideBar/SideBar';

import {fetchPostList} from '../../actions';

class Home extends Component{

constructor(){
    super();
    this.handleScroll = this.handleScroll.bind(this);
}

componentDidMount(){
    this.props.fetchPostList(0,5);
    window.addEventListener('scroll',this.handleScroll);
}

componentWillUnmount(){
    window.removeEventListener('scroll',this.handleScroll);
}

handleScroll(){
    
        if (document.body.scrollTop > 530 || document.documentElement.scrollTop > 530) {
          document.getElementById("scrollBtn").style.display = "block";
        } else {
          document.getElementById("scrollBtn").style.display = "none";
        }
          
}

    render(){
        return(
            <div className='home'>
                {this.props.allPosts.content?<PostList type='home' fetch={this.props.fetchPostList} posts={this.props.allPosts}/>:null}
                <SideBar title='Home' description='You are on the front page.Create posts, comment and appreciate others, join and create spaces'/>
                <Button onClick={()=>{document.body.scrollTop = 0;document.documentElement.scrollTop = 0}} id='scrollBtn'><i className='fas fa-arrow-up'/>Back to top</Button>
            </div>
        )
        }
    }

const mapStateToProps=({img,allPosts})=>{
    return{img,allPosts}
}

export default connect(mapStateToProps,{fetchPostList})(Home);
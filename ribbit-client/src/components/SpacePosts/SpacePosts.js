import React,{Component} from 'react';
import {connect} from 'react-redux';

import {getPostsBySpace,getSpaceByName} from '../../actions';

import './SpacePosts.scss';
import PostList from '../PostList/PostList';
import SideBar from '../SideBar/SideBar';

class SpacePosts extends Component{

componentDidMount(){
    this.props.getPostsBySpace(this.props.match.params.name);
    this.props.getSpaceByName(this.props.match.params.name);
}

    render(){
        return(
            <div className='space-post'>  
                <div className='space-post__container'>
                  {this.props.bySpace.content?<PostList posts={this.props.bySpace} type='space' fetch={this.props.getPostsBySpace}/>:null}
                  {this.props.space?<SideBar title={this.props.space.name} description={this.props.space.description}/>:null}
                </div>
            </div>
        )
    }
}

const mapStateToProps =({allSpaces,bySpace,space})=>{
    return {allSpaces,bySpace,space}
}

export default connect(mapStateToProps,{getPostsBySpace,getSpaceByName})(SpacePosts);
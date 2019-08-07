import React,{Component} from 'react';
import {connect} from 'react-redux';

import {searchPostsByTitleContaining} from '../../actions';

import './Search.scss';

import PostList from '../PostList/PostList';

class Search extends Component{

componentDidMount(){
    this.props.searchPostsByTitleContaining(this.props.match.params.title);
    
}

componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.title !== this.props.match.params.title) {

        this.props.searchPostsByTitleContaining(nextProps.match.params.title);
    }
}


    render(){
        
        return(
            <div className='search'>
                {this.props.search.content?<PostList fetch={this.props.searchPostsByTitleContaining} type='search' posts={this.props.search}/>:null}
            </div>
        )
        
    }
}

const mapStateToProps = ({search})=>{
    return{search};
}

export default connect(mapStateToProps,{searchPostsByTitleContaining})(Search);
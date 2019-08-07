import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './MainNav.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


import { ACCESS_TOKEN } from '../../constants';
import {getCurrentUser,anullCurrentUser,getMyImage} from '../../actions';
import { Button } from 'antd';

class MainNav extends Component{

componentDidMount(){
    this.props.getMyImage();
    this.props.getCurrentUser();
}

constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
        isOpen:false
    }
    this.state={
        search:''
    }
}

toggle(){
    this.setState({isOpen:!this.state.isOpen})
}

handleInputSubmit(){
 this.props.history.push(`/search/${this.state.search}`);
}

handleLogout(){
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.anullCurrentUser();
}


renderNavSection(){
    if(localStorage.getItem(ACCESS_TOKEN)){
        return(
            <div className='main-nav__profile'>
                <button className='main-nav__btn'><img alt='profile img' style={{marginRight:'1rem'}} className='main-nav__profile__img' src={this.props.myImage?this.props.myImage:require('../../img/avatar.png')}/>{this.props.currentUser.username}<i className='fas fa-chevron-down sm main-nav__profile__dropdown-icon'/></button>
                {this.props.currentUser?
                <div className='main-nav__dropdown'>
                    <Link className='main-nav__dropdown__link' to='/newPost'>Create Post</Link>
                    <Link className='main-nav__dropdown__link' to={`/profile/${this.props.currentUser.username}`}>My profile</Link>
                    <button onClick={()=>this.handleLogout()}>Log out</button>
                </div>:null}
            </div>
            )
    }
    else{
        return(
            <div className='main-nav__auth'>
                <Button style={{marginRight:'1rem'}} type='primary'><Link to='/login'>Login</Link></Button>
                <Button type='primary'><Link to='/signup'>SignUp</Link></Button>
            </div>
        )
    }
}

    render(){
        return(
            <div className='main-nav'>
                <span ><Link className='main-nav__logo' to='/'><img alt='logo' className='main-nav__logo__img' src={require('../../img/logo.png')}/>Ribbit</Link></span>
                <div className='main-nav__search'>
                   <input onChange={(e)=>this.setState({search:e.target.value})} value={this.state.search} className='main-nav__search__input' palceholder='Search posts and spaces' style={{fontFamily:'Arial , FontAwesome'}} type='search'/>
                   <button className='main-nav__search__input__btn' onClick={()=>this.handleInputSubmit()}><i className='fas fa-search'/></button>
                </div>
                {this.renderNavSection()}
            </div>
        )
    }
}

const mapStateToProps=({myImage,currentUser})=>{
    return{myImage,currentUser}
}

export default withRouter(connect(mapStateToProps,{getMyImage,getCurrentUser,anullCurrentUser})(MainNav));
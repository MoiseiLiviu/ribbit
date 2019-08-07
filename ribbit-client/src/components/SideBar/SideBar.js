import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import './SideBar.scss';
import Spaces from '../Spaces/Spaces';
import Footer from '../Footer/Footer';
import {connect} from 'react-redux';

 class SideBar extends Component{

    render(){
        return(
            <div className='sidebar'>
                <div className='sidebar__home'>
                    {this.props.title==='Home'?<div className='sidebar__home__heading-1'/>
                    :<div className='sidebar__home__heading-2'/>}
                    <h2 className='sidebar__home__title'>{this.props.title}</h2>
                    <p className='sidebar__home__intro'>{this.props.description}</p>
                    {this.props.title==='Home'?<div className='sidebar__home__btn-container'>
                        <Link to={this.props.currentUser.username?'/newPost':'/'} className={this.props.currentUser.username?'sidebar__home__btn':'disabled'}>Create Post</Link>
                        <Link to={this.props.currentUser.username?'/newSpace':'/'} className={this.props.currentUser.username?'sidebar__home__btn':'disabled'}>Create Space</Link>
                    </div>:<img alt='space-post' style={{width:'100%',height:'5rem',borderBottomLeftRadius:'6px',borderBottomRightRadius:'6px'}} src={require('../../img/waves.jpg')}/>}
                </div>
                {this.props.title==='Home'?<Spaces/>:null}
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps=({currentUser})=>{
    return{currentUser}
}

export default connect(mapStateToProps)(SideBar);
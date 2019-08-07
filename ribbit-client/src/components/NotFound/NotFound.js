import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import './NotFound.scss';

export default class NotFound extends Component{

    render(){
        return(
            <div className='not-found'>
                <h2 className='not-found__title'>Page not found</h2>
                <p className='not-found__text'>Looks like you've followed a broken link or entered an invalid URL</p>
                <Link to='/' className='not-found__link'><i className='fas fa-arrow-left'/>Back to home</Link>
            </div>
        )
    }
}
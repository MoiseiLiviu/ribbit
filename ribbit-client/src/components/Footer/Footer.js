import React,{Component} from 'react';

import './Footer.scss';

export default class Footer extends Component{

    render(){
        return(
            <div className='footer'>
                 <p><span style={{fontWeight:'bold',fontSize:'1.2rem'}}>About Ribbit:</span> Fullstack app created with React/Redux/SASS frontend and Java(Spring boot,Spring Security,Hibernate)backend, MySql database,Heroku for deployment.</p>
                 <div className='ui divider'/>
                <div className='footer__details'>
                    <a className='footer__details__link'>My portofolio</a>
                    <a className='footer__details__link'>My resume</a>
                    <a className='footer__details__link'>Github</a>
                    <h3 className='footer__details__link'>Contact me:lmoisei@list.ru</h3>
                </div>
                <div className='ui divider'/>
                <h5>Project created by Moisei Liviu 2019</h5>
            </div>
        )
    }
}
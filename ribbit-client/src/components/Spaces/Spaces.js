import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getAllSpaces} from '../../actions';

import './Spaces.scss';
import { Popover } from 'antd';

class Spaces extends Component{

state={
 isOpen:false
}

componentDidMount(){
    this.props.getAllSpaces();
    this.toggle = this.toggle.bind(this);
}

toggle(){
    this.setState((prevState=>{return{isOpen:!prevState.isOpen}}))
}

    render(){
        if(this.props.allSpaces){
        return(
            <div className='spaces'>
              <h2 className='spaces__title'>Spaces:</h2>
              {this.props.allSpaces.map(space=>
                    <div key={space.name} className='spaces__section'>
                     <Popover content={space.description.length>0?space.description:null} title='Space description'>
                       <h2 className='spaces__section__link'><Link to={`/posts/${space.name}`}><img alt='space-heading__img' className='spaces__section__link__img' src={require('../../img/science.png')}/>{space.name}</Link></h2>
                     </Popover>
                    </div>
              )}
            </div>
        )
      }
      else{
          return(
              <div>Loading...</div>
          )
      }
    }
}

const mapStateToProps = ({allSpaces})=>{
    return {allSpaces}
}

export default connect(mapStateToProps,{getAllSpaces})(Spaces);
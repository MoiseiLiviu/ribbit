import React,{Component} from 'react';

import './CreateSpace.scss';
import { Button, notification,Form ,Input} from 'antd';

import {createSpace} from '../../util/ApiUtils';
import {SPACE_DESCRIPTION_MAX_LENGTH,SPACE_NAME_MAX_LENGTH, SPACE_NAME_MIN_LENGTH} from '../../constants';

import SideBar from '../SideBar/SideBar';

const FormItem = Form.Item;

export default class CreateSpace extends Component{

    constructor(){
        super();
        this.state={
            name:{
                value:''
            },
            description:{
                value:''
            }
        }
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }

    handleInputChange(e,validationFunction){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]:{value:value,...validationFunction(value)}})
    }

    handleFormSubmit(e){
       e.preventDefault();
       const spaceRequest={name:this.state.name.value,description:this.state.description.value};
       createSpace(spaceRequest).then(()=>{
           this.props.history.push('/');
           notification.success({
               message:'Ribbit app',
               description:'Space created successfully'
           })}
       ).catch(err=>{
           notification.error({
               message:'Ribbit app',
               description:err.message
           })
       })
    }

    render(){
        console.log(this.state)
        return(
            <div className='space-creator__container'>
                <Form className='space-creator__form' onSubmit={(e)=>this.handleFormSubmit(e)}>
                    <h2>Create space</h2>
                    <div className='ui divider'/>
                    <FormItem hasFeedback label='Space name:' help={this.state.name.errorMsg} validateStatus={this.state.name.validationStatus}>
                       <Input name='name' value={this.state.name.value} onChange={(e)=>this.handleInputChange(e,this.checkNameValue)}/>
                    </FormItem>
                    <FormItem hasFeedback label='Space description:' help={this.state.description.errorMsg} validateStatus={this.state.description.validationStatus}>
                        <Input name='description' value={this.state.description.value} onChange={(e)=>this.handleInputChange(e,this.checkDescriptionValue)}/>
                    </FormItem>
                    <FormItem>
                        <Button htmlType='submit' type='primary'>Submit</Button>
                    </FormItem>
                </Form>
                <SideBar title='Create new space'/>
            </div>
        )
    }

    checkNameValue(name){
       if(name.length>SPACE_NAME_MAX_LENGTH||name.length<SPACE_NAME_MIN_LENGTH){
           return{
               validationStatus:'error',
               errorMsg:'Space name length is invalid'
           }
       }
       else return{
           validationStatus:'success',
           errorMsg:null
       }
    }
    checkDescriptionValue(description){
        if(description.length>SPACE_DESCRIPTION_MAX_LENGTH){
            return{
                validationStatus:'error',
                errorMsg:'Space description length is invalid'
            }
        }
        return{
            validationStatus:'success',
            errorMsg:null
        }
    }
}
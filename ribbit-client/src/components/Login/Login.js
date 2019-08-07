import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {login} from '../../util/ApiUtils';
import {getCurrentUser} from '../../actions';
import {ACCESS_TOKEN} from '../../constants';

import {Form,Input,Button,Icon,notification} from 'antd';
const FormItem = Form.Item;

class Login extends Component{


    componentWillUnmount(){
      this.props.getCurrentUser();
    }

    render(){

        const AntWrappedLoginForm = Form.create()(LoginFormWithRouter)
        return(
            <div style={{marginTop:'7rem',minHeight:'100vh'}}>
                <h1 style={{textAlign:'center',color:'white',marginBottom:'1.5rem'}} className='page-title'>Login</h1>
                <div>
                    <AntWrappedLoginForm/>
                </div>
            </div>
        );
    }
}

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit= event=>{
        event.preventDefault();   
        this.props.form.validateFields( (err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);     
                    this.props.history.push('/');
                    notification.success({
                        message:'Ribbit App',
                        description:'Logged In Successfully.'})
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Polling App',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });                    
                    } else {
                        notification.error({
                            message: 'Polling App',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });                                            
                    }
                });
            }
        });
}

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <Form style={{width:'30rem',margin:'0 auto'}} onSubmit={this.handleSubmit} className='login-form'>
                <FormItem>
                  {getFieldDecorator('usernameOrEmail',{
                      rules:[{required:true,message:'Please input your username or email'}],
                  })(
                  <Input prefix={<Icon type='user'/>} size='large' name='usernameOrEmail' placeholder='Username Or email'/>
                  )}
                  </FormItem>
                <FormItem>
                    {getFieldDecorator('password',{
                        rules:[{required:true,message:'Please input your password'}],
                    })(
                        <Input prefix={<Icon type='lock'/>} size='large' name='password' type='password' placeholder='Password'/>
                    )
                    }
                </FormItem>
                <FormItem>
                    <Button type='primary' htmlType='submit' size='large' className='login-form-button'>
                        Login 
                    </Button>
                    Or <Link to='/signup'>Register now!</Link>
                </FormItem>
            </Form>
        )
    }
}

const mapStateToProps=({currentUser})=>{
    return {currentUser}
}

const LoginFormWithRouter = withRouter(LoginForm);
export default withRouter(connect(mapStateToProps,{getCurrentUser})(Login));
import React,{Component} from 'react';
import {signup,checkUsernameAvailability,checkEmailAvailability} from '../../util/ApiUtils';
import {getCurrentUser} from '../../actions';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,USERNAME_MIN_LENGTH,USERNAME_MAX_LENGTH,EMAIL_MAX_LENGTH,PASSWROD_MIN_LENGTH,PASSWORD_MAX_LENGTH
} from '../../constants';

import {Form,Input,Button,notification} from 'antd';
import './SignUp.scss';

const FormItem = Form.Item;

class SignUp extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            name:{
                value:''
            },
            username:{
                value:''
            },
            email:{
                value:''
            },
            password:{
                value:''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    componentWillUnmount(){
        this.props.getCurrentUser();
    }

    handleInputChange(event,validationFunction){
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({[inputName]:{
            value:inputValue,
            ...validationFunction(inputValue)
        }})
    };

    handleSubmit(event){
        event.preventDefault();

        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };

        signup(signupRequest)
        .then(response=>{
            notification.success({
                message:'Coli App',
                description:`You're done here pukich`
            });
            this.props.history.push("/");
        }).catch(error=>{
            notification.error({
                message:'Coli App',
                description:'Something went bananas'
            })
        });
    }

    isFormInvalid(){
        return !(this.state.name.validateStatus ==='success'&&
        this.state.username.validateStatus === 'success'&&
        this.state.email.validateStatus ==='success'&&
        this.state.password.validateStatus ==='success');
    }

    render(){
        if(this.state.name.validateStatus){
            console.log(this.state.name.validateStatus);
        }
        return(
            <div className='signup-container' style={{minHeight:'100vh'}}>
                 <div className='signup-content'>
                   <Form style={{width:'40rem',margin:'1.5rem auto',backgroundColor:'white',borderRadius:'4px',padding:'1.5rem 1.5rem'}} onSubmit={this.handleSubmit} className='signup-form'>
                      <FormItem>
                          <h1>Sign up</h1>
                          <div className='ui divider'/>
                      </FormItem>
                      <FormItem hasFeedback
                      label='Full Name'
                      validateStatus={this.state.name.validateStatus}
                      help={this.state.name.errorMsg}>
                          <Input size='large' name='name' autoComplete='off' placeholder='Your full name' value={this.state.name.value} onChange={(e)=>this.handleInputChange(e,this.validateName)}>
                          </Input>
                      </FormItem>

                      <FormItem label='Username' hasFeedback validateStatus={this.state.username.validateStatus} help={this.state.username.errorMsg}>
                          <Input name='username' size='large' autoComplete='off' placeholder='Insert username' value={this.state.username.value} onBlur={this.validateUsernameAvailability} onChange={(e)=>this.handleInputChange(e,this.validateUsername)}>
                          </Input>
                      </FormItem>

                      <FormItem label='Email' hasFeedback help={this.state.email.errorMsg} validateStatus={this.state.email.validateStatus}>
                         <Input placeholder='Insert email' name='email' value={this.state.email.value} onBlur={this.validateEmailAvailability} type='email' size='large' onChange={(e)=>this.handleInputChange(e,this.validateEmail)}/>
                      </FormItem>

                      <FormItem help={this.state.password.errorMsg} label='Password' validateStatus={this.state.password.validateStatus}>
                          <Input placeholder='Insert password' type='password' onChange={(e)=>this.handleInputChange(e,this.validatePassword)} size='large' value={this.state.password.value} autoComplete='off' name='password'/>
                      </FormItem>

                      <FormItem>
                          <Button type='primary' htmlType='submit' size='large' className='signup-form-button' disabled={this.isFormInvalid()}>
                             Sign up
                          </Button>
                          Already registered? <Link to='/login'>Login now</Link>
                      </FormItem>
                   </Form>
                 </div>
            </div>
        );
    }

    //All the validation functions called at input value changes for dynamic feedback
    validateName(name){
      if(name.length < NAME_MIN_LENGTH){
          return{
              validateStatus:'error',
              errorMsg:`Name is too short (Minimum ${NAME_MIN_LENGTH} characters required)`
          }
      }
      else if(name.length > NAME_MAX_LENGTH){
          return{
              validateStatus:'error',
              errorMsg:`Name too long (Maximum ${NAME_MAX_LENGTH} characters allowed)`
          }
      }
      else{
          return{
              validateStatus:'success',
              errorMsg:null
          }
      }
    }

    validateEmail(email){
        //Email specific regular expression, string validation.
        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');

        if(email.length > EMAIL_MAX_LENGTH){
            return{
                validateStatus:'error',
                errorMsg:`Email too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }
        else if(!email){
            return{
                validateStatus:'error',
                errorMsg:'Email empty'
            }
        }
        else if(!EMAIL_REGEX.test(email)){
            return{
                validateStatus:'error',
                errorMsg:'Email is invalid'
            }
        }

        return{
            validateStatus:null,
            errorMsg:null
        }

        
    }

    validateUsername(username){
        if(username.length < USERNAME_MIN_LENGTH){
            return{
                validateStatus:'error',
                errorMsg:`Username too short (Minimum characters:${USERNAME_MIN_LENGTH})`
            }
        }
        else if(username.length > USERNAME_MAX_LENGTH){
            return{
                validateStatus:'error',
                errorMsg:`Username too long (Maximum characters: ${USERNAME_MAX_LENGTH})`
            }
        }
        else {
            return{
                validateStatus:null,
                errorMsg:null
            }
        }
    }

    //Calls the diagnostic api actions which return a boolean value depending on the availability of the username/email as they should be unique.
    validateUsernameAvailability(){
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus==='error'){
            this.setState({
                username:{
                    value:usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }
        this.setState({
            username:{
                value:usernameValue,
                validateStatus:'validating',
                errorMsg:null
            }
        });

        checkUsernameAvailability(usernameValue)
         .then(response=>{
             if(response.available===true){
                 this.setState({
                     username:{
                         value:usernameValue,
                         validateStatus:'success',
                         errorMsg:null
                     }
                 })
             }
             else{
                 this.setState({
                     username:{
                        value:usernameValue,
                        validateStatus:'error',
                        errorMsg:'This username is already taken'
                     } 
                 })
             }
         }).catch(error=>{
             this.setState({
                 username:{
                     value:usernameValue,
                     validateStatus:'success',
                     errorMsg:null
                 }
             })
         })
    }

    validateEmailAvailability(){
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus==='error'){
            this.setState({
                email:{
                    value:emailValue,
                    ...emailValidation
                }
            });
            return;
        }
        
        this.setState({
            email:{
                value:emailValue,
                validateStatus:'validating',
                errorMsg:null
            }
        })

        checkEmailAvailability(emailValue)
         .then(response=>{
             if(response.available){
                 this.setState({
                     email:{
                         value:emailValue,
                         validateStatus:'success',
                         errorMsg:null
                     }
                 })
             }
             else{
                 this.setState({
                     email:{
                         value:emailValue,
                        validateStatus:'error',
                    errorMsg:'This email is already registered'                     }
                 })
             }
         }).catch(err=>{
             this.setState({
                 email:{
                     value:emailValue,
                     validateStatus:'success',
                     errorMsg:null
                 }
             })
         })
    }

    validatePassword(password){
        if(password.length > PASSWORD_MAX_LENGTH){
            return{
                validateStatus:'error',
                errorMsg:`Password too long (Maximum characters:$${PASSWORD_MAX_LENGTH}`
            }
        }
        else if(password.length < PASSWROD_MIN_LENGTH){
            return{
                validateStatus:'error',
                errorMsg:`Password too short (Minimum characters: ${PASSWROD_MIN_LENGTH})`
            }
        }
        else{
            return{
                validateStatus:'success',
                errorMsg:null
            }
        }
        }
    }


export default withRouter(connect(null,{getCurrentUser})(SignUp));
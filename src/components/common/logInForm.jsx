import React, { Component } from 'react';
import Input from './input';
class LogInForm extends Component {
    state = {account : {username : '', password : ''}}
     username = React.createRef();
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('SUbmitted')
    }
    // componentDidMount(){
    //     this.username.current.focus();
    // }
    handleChange = ({currentTarget : input}) => {
        const account = {...this.state.account}
        account[input.name] = input.value;
        this.setState({account});
    }
    render() {
        const {account} = this.state;
        return (
           
               <div>
                   <h1>Login</h1>
                   <form onSubmit = {this.handleSubmit}>
                      <Input
                      name = "username"
                      value = {account.username}
                      label = "Username"
                      onChange = {this.handleChange}/>
                       <Input
                      name = "password"
                      value = {account.password}
                      label = "Password"
                      onChange = {this.handleChange}/>
                       <button className="btn btn-primary">LogIn</button>

                   </form>
               </div>
       
        );
    }
}

export default LogInForm;
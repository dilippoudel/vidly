import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Movies from './components/movies';
import Customer from './components/common/customer';
import Rentals from './components/common/rentals';
import NotFound from './components/common/notFound';
import NavBar from './components/common/navBar';
import MovieForm from './components/common/movieForm';
import LogInForm from './components/common/logInForm';
import RegisterForm from './components/common/registerForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <NavBar/>
        <main className="container">
        <Switch>
        <Route path="/registerForm" component={RegisterForm}/>
        <Route path="/login" component={LogInForm}/>
          <Route path = "/movies/:id" component = {MovieForm}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/customer" component={Customer}/>
            <Route path="/rentals" component={Rentals}/>
            <Route path="/not-found" component={NotFound}/>      
            <Redirect from = "/" exact to ="/movies"/>
            <Redirect to = "/not-found" />
        </Switch>

 </main>
 </React.Fragment>
    );
  }
}

export default App;


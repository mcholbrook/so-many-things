import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import authService from "../../services/authService";
import Users from '../Users/Users'
import "./App.css";
import ThingsCard from '../../components/ThingsCard/ThingsCard'

class App extends Component {
  state = {
    user: authService.getUser(),
    mirandasThings: [
      { 
        name: 'dumpling',
        image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        attributes: ['delicious', 'the perfect food', 'not a taco', 'delicious when pan-friend or when steamed']
      },
      {
        name: 'books',
        image: 'https://images.unsplash.com/photo-1560011961-4ab41261de01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        attributes: ['interesting', 'always a good default gift idea', 'can read them over and over again']
      },
      {
        name: 'green onions',
        image: 'https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
        attributes: ['the most perfect produce item', 'cute', 'will regrow in a glass of water', 'have one tattooed']
      },
      {
        name: 'coffee',
        image: 'https://i.imgur.com/3BmfSOA.png',
        attributes: ["caffeine, duh", "good by itself", "good with milk", "will give temporary superpowers"] 
      }
    ]
  };

  handleLogout = () => {
    authService.logout();
    this.setState({ user: null });
    this.props.history.push("/");
  };

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() });
  };



  render() {
    const { user } = this.state
    return (
      <>
        <NavBar user={this.state.user} handleLogout={this.handleLogout}/>
        <Route
          exact
          path="/"
          render={() => (
            <main>
              <h1>Welcome. This is an authorization template.</h1>
              <Link 
                to={{
                  pathname: '/miranda'
                }}
              >Miranda's Things</Link>
            </main>
          )}
        />
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <Signup
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <Login
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/users"
          render={() =>
            user ? <Users /> : <Redirect to="/login" />
          }
        />
        <Route
          exact path="/miranda"
          render={({history}) => (
            <ThingsCard 
              history={history}
              things={this.state.mirandasThings}
            />
          )}
        />
        
      </>
    );
  }
}

export default App;

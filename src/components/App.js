import React, { Component } from 'react';
import { logout } from '../helpers/auth'
import { Route, BrowserRouter, Link, Switch, withRouter } from 'react-router-dom'
import { rebase } from '../config/constants'
import {loginWithGoogle} from '../helpers/auth';
import Login from './Login';

import Home from './Home';
import Register from './Register';
import Songs from './Songs';
import createBrowserHistory from 'history/createBrowserHistory'
import './App.css';

import {
  
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Row } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      authed: false,
      loading: true,
      uid: null,
    }

    this.history = createBrowserHistory();

    this.authenticate = this.authenticate.bind(this);
    this.logoutApp = this.logoutApp.bind(this);
    this.changeURL = this.changeURL.bind(this);
  } 

  componentDidMount () {
    console.log("componentDidMount");
    this.authListener = rebase.initializedApp.auth().onAuthStateChanged((user) =>{
  
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          uid: user.uid,
        });
        //get DB stuff for user here
      } else {
        this.setState({
          authed: false,
          loading: false,
          uid: null,
        })
      }
    })
  }
  componentWillUnmount () {
    console.log("componentWillUnmount");
    this.authListener()
  }
  
  authenticate(){
    console.log('App: calling autheticate for google');
    loginWithGoogle();
  }

  logoutApp(){
    console.log('App: calling logoutApp')
    logout();
  }

 

  changeURL(newURL){
    console.log("here is change", newURL);
    //this.history.push('/songs');
    let newStuff = withRouter(( history ) => {
       history.push('/songs');
    });
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;

    return (
      <div>
        <BrowserRouter>
        <div>
          <Navbar expand="sm">
            <div className="container">
              
              <NavbarBrand>Music History with React, Rebase, Route, Firebase, Auth</NavbarBrand>
              
              <Nav>
                <NavItem>
                  <Link to="/" className="btn btn-primary">Home</Link>
                </NavItem>

                {this.state.authed ?
                <NavItem>
                  <Link to="/songs" className="btn btn-primary">Songs</Link>
                </NavItem>
                : null}
                </Nav>

                <Nav>
                {this.state.authed
                  ? <span>
                      <div>Welcome</div>
                      <button
                          onClick={() => {this.logoutApp()}} className="btn btn-secondary">Logout</button>
                          {/* <Redirect to="/songs"/> */}
                    </span>
                    : <span>
                        <div>Sign in to manage your songs</div>
                        <Link to="/login" className="btn btn-primary">Login</Link>
                        <button onClick={() => this.authenticate('google')} 
                          className="btn btn-primary">Login Google</button>
                        <Link to="/register" className="btn btn-secondary">Register</Link>
                      </span>
                  }
                </Nav>
            </div>
          </Navbar>
          
          <Container>
           
              <Switch>
                <Route path='/' exact component={Home} />
                <Route authed={this.state.authed} path='/login' component={Login} />
                <Route authed={this.state.authed} path="/register" children={props => <Register changeURL={this.changeURL} {...props} />} /> */}
                 {/* allows passing props to components when loading */}
                 {/* Need to fix changing of url after user registers */}
                {this.state.authed ?
                  <Route authed={this.state.authed} path="/songs" children={props => <Songs user={this.state.uid} {...props} />} />
                : <Route path='/' component={Home} /> } 
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
           
          </Container>
          </div>
        </BrowserRouter>
      </div>
    
    );
  }
}

export default App;

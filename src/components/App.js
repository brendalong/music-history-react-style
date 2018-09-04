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
    withRouter(( history ) => {
       history.push('/songs');
    });
  }


  render() {
   //  const logout = <button onClick={this.logout}>Log Out</button>;

    return (
      <div>
        <BrowserRouter>

         <div>
            <div className="container">
                   <nav className="navbar navbar-expand navbar-dark bg-dark">
               <div>Music History with React, Rebase, Route, Firebase, Auth</div>

                  <ul className="nav nav-pills">
                     <li className="nav-item">
                        <Link to="/" className="btn btn-primary">Home</Link>
                     </li>

                  {this.state.authed ?
                     <li className="nav-item">
                        <Link to="/songs" className="btn btn-primary">Songs</Link>
                     </li>
                  : null}

                  </ul>

                      <div style={{width:'100%'}}>
                {this.state.authed
                  ? <span >
                     <div style={{ textAlign: 'right' }}>Welcome</div>
                     <button onClick={() => {this.logoutApp()}} className="btn btn-secondary">Logout</button>
                          {/* <Redirect to="/songs"/> */}
                    </span>
                  : <span>
                     <div style={{ textAlign:'right' }}>Sign in to manage your songs</div>
                        <ul className="nav nav-pills justify-content-end">
                           <li>
                              <Link to="/login" className="btn btn-primary">Login</Link>
                           </li>
                           <li>
                              <Link to="/register" className="btn btn-secondary">Register</Link>
                           </li>
                           <li>
                              <button onClick={() => this.authenticate('google')} className="btn btn-primary">Login Google</button>
                           </li>
                        </ul>
                     </span>
                  }
                </div>
         </nav>
         </div>

             <div className="container">

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

          </div>
         </div>

        </BrowserRouter>
      </div>

    );
  }
}

export default App;

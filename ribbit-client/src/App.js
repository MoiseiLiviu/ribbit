import React from 'react';
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';

import './App.css';

import NavBar from './components/MainNav/MainNav';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import CreatePost from './components/CreatePost/CreatePost';
import SpacePosts from './components/SpacePosts/SpacePosts';
import Search from './components/Search/Search';
import Profile from './components/Profile/Profile';
import CreateSpace from './components/CreateSpace/CreateSpace';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
   <Router>
    <div className="App">
      <NavBar/>
         <Switch>
           <Route path="/" exact component={Home}/>
           <Route path="/signup" exact component={SignUp}/>
           <Route path='/login' exact component={Login}/>
           <Route path='/newPost' exact component={CreatePost}/>
           <Route path='/posts/:name' exact component={SpacePosts}/>
           <Route path='/search/:title' exact component={Search}/>
           <Route path='/profile/:username' exact component={Profile}/>
           <Route path='/newSpace' exact component={CreateSpace}/>
           <Route component={NotFound}/>
         </Switch>
    </div>
  </Router>
  );
}

export default App;

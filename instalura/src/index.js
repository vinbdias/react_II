import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/reset.min.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route,Switch,Link,Redirect,withRouter } from 'react-router-dom';
import Login from './componentes/Login';
import Timeline from './componentes/Timeline';

function verificarAutenticacao() {

    if(localStorage.getItem('auth-token') === null)
        return false;

    return true;    
}

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />  
            <Route path="/timeline" render={() => (verificarAutenticacao()) ? (<App />) : (<Login mensagem="Favor autenticar" />)} />                              
        </Switch>
    </Router>
), document.getElementById('root'));
registerServiceWorker();


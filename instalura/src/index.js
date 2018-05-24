import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/reset.min.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route,Switch,Link,Redirect } from 'react-router-dom';
import Login from './componentes/Login';
import Timeline from './componentes/Timeline';
import UsuarioService from './services/UsuarioService';

let usuarioService = new UsuarioService();

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path="/" render={() => usuarioService.verificarAutenticacao() ? (<App />) : (<Login />)} />  
            <Route path="/login" render={() => usuarioService.verificarAutenticacao() ? (<App />) : (<Login />)} />  
            <Route path="/timeline" render={() => (usuarioService.verificarAutenticacao()) ? (<App />) : (<Login mensagem="Favor autenticar" />)} />                              
        </Switch>
    </Router>
), document.getElementById('root'));
registerServiceWorker();


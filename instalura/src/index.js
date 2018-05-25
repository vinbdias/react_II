import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/reset.min.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import UsuarioService from './services/UsuarioService';

let usuarioService = new UsuarioService();

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path="/" render={(props) => usuarioService.obterToken() ? (<App {...props} />) : (<Login />)} />  
            <Route path="/login" component={Login} />  
            <Route path="/logout" component={Logout} />  
            <Route path="/timeline/:usuario?" render={(props) =>
                 ((props.match.params.usuario !== undefined) || (props.usuario !== undefined) || usuarioService.obterToken()) ?
                  (<App {...props} />) :
                   (<Login mensagem="Favor autenticar para acessar o endereço" />)} />                
        </Switch>
    </Router>
), document.getElementById('root'));
registerServiceWorker();
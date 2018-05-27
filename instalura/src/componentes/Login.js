import React, {Component} from 'react';
import UsuarioService from '../services/UsuarioService';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    constructor(props) {

        super(props);

        this.state = { mensagem: this.props.mensagem };

        this._usuarioService = new UsuarioService();
    }

    autenticarUsuario(evento) {

        evento.preventDefault();

        let dadosAutenticacaoUsuario = {

            login: this._login.value,
            senha: this._senha.value
        };

        this._usuarioService
            .autenticar(dadosAutenticacaoUsuario)
            .then(token => { 
                localStorage.setItem('auth-token', token);
                this.forceUpdate();
             })
            .catch(erro => this.setState({mensagem: erro.message}));
    }

    render() {

        if(this._usuarioService.obterToken()) 
            return (<Redirect to="../timeline" />);
            
        return (

           <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.mensagem}</span>
                <form onSubmit={this.autenticarUsuario.bind(this)}>
                    <input type="text" ref={(input) => this._login = input} />
                    <input type="password" ref={(input) => this._senha = input} />
                    <input type="submit" value="login" />
                </form>
           </div> 
        );
    }
}
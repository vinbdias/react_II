import React, {Component} from 'react';
import UsuarioService from '../services/UsuarioService';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    constructor(props) {

        super(props);
        this.state = {
            mensagem: this.props.mensagem,
            autenticado: false
        }
        this._usuarioService = new UsuarioService();
    }

    autenticarUsuario(evento) {

        evento.preventDefault();

        const dadosAutenticacaoUsuario = {

            login: this.login.value,
            senha: this.senha.value
        };

        this._usuarioService
            .autenticar(dadosAutenticacaoUsuario)
            .then(token => {

                localStorage.setItem('auth-token', token);
                this.setState({ autenticado: true });
            })
            .catch(erro => this.setState({mensagem: erro.message}));
    }

    render() {

        if(this.state.autenticado)
            return (<Redirect to="../timeline" />);

        return (

           <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.mensagem}</span>
                <form onSubmit={this.autenticarUsuario.bind(this)}>
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="password" ref={(input) => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
           </div> 
        );
    }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FotoService from '../services/FotoService';
import UsuarioService from '../services/UsuarioService';

class FotoHeader extends Component {

    render(data) {

        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.foto.urlPerfil} alt="foto do usuario" />
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.foto.loginUsuario}`}>{this.props.foto.loginUsuario}</Link>  
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>            
        );
    }
}

class FotoInfo extends Component {

    
    render() {

        return (
        <div className="foto-info">
            <div className="foto-info-likes">
              {
                this.props.foto.likers.map(usuarioCurtiu => 
                    <Link to={`/timeline/${usuarioCurtiu.login}`} key={usuarioCurtiu.login}>{usuarioCurtiu.login},</Link>)
              }
               curtiram            
            </div>

            <p className="foto-info-legenda">
              <a className="foto-info-autor">autor </a>
              {this.props.foto.comentario}
            </p>

            <ul className="foto-info-comentarios">
              {
                  this.props.foto.comentarios.map(comentario => 
                  <li key={comentario.id} className="comentario">
                    <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login} </Link>
                    {comentario.texto}
                  </li>)
              }
            </ul>
          </div>            
        );
    }
}

class FotoAtualizacoes extends Component {

    constructor(props) {

        super(props);
        this._fotoService = new FotoService();
        this._usuarioService = new UsuarioService();

        const curtida = this.props.foto.likers.find(liker => liker.login === this._usuarioService.obterUsuarioLogado());

        this.state = { curtida: (curtida !== undefined) ? true : false };        
    }

    curtirFoto(evento) {

        evento.preventDefault();
        this.setState({ curtida: !this.state.curtida });
        this.props.curtirFoto(this.props.foto.id, this._fotoService);
    }

    comentarFoto(evento) {

        evento.preventDefault();
        this.props.comentarFoto(this.props.foto.id, this._inputComentario.value, this._fotoService);
    }

    render() {

        return (
        <section className="fotoAtualizacoes">
            <a onClick={this.curtirFoto.bind(this)} className={this.state.curtida ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Curtir</a>
            <form className="fotoAtualizacoes-form" onSubmit={this.comentarFoto.bind(this)}>
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this._inputComentario = input} />
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
            </form>
        </section>            
        );
    }
}

export default class FotoItem extends Component {

    render() {

        return (
        <div className="foto">
            <FotoHeader foto={this.props.foto} />
            <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
            <FotoInfo foto={this.props.foto} />
            <FotoAtualizacoes {...this.props} />
        </div>            
        );
    }
}
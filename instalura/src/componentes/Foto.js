import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FotoService from '../services/FotoService';
import Pubsub from 'pubsub-js';

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

    constructor(props) {

        super(props);
        this.state = {
            usuariosCurtiram: this.props.foto.likers,
            comentarios: this.props.foto.comentarios
        };
    }
    
    componentWillMount() {

        this._atualizaCurtidas();
        this._atualizaComentarios();
    }

    _atualizaCurtidas() {

        Pubsub.subscribe('atualiza-usuarios-curtiram', (topico, infoUsuarioCurtiu) => {
            
            if(this.props.foto.id === infoUsuarioCurtiu.fotoId) {
                
                const possivelCurtida = 
                    this.state
                    .usuariosCurtiram
                    .find(usuarioCurtiu => 
                        usuarioCurtiu.login === infoUsuarioCurtiu.usuarioCurtiu.login);

                if(possivelCurtida === undefined) {

                    const novasCurtidas = this.state.usuariosCurtiram.concat(infoUsuarioCurtiu.usuarioCurtiu);
                    this.setState({ usuariosCurtiram: novasCurtidas });                    
                }
                else {

                    const novasCurtidas = this.state.usuariosCurtiram.filter(usuarioCurtiu => usuarioCurtiu.login !== infoUsuarioCurtiu.usuarioCurtiu.login);
                    this.setState({ usuariosCurtiram: novasCurtidas });
                }
            }
        });        
    }

    _atualizaComentarios() {

        Pubsub.subscribe('novos-comentarios', (topico, infoComentario) => {

            if(this.props.foto.id === infoComentario.fotoId) {

                const novosComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
                this.setState({ comentarios: novosComentarios });
            }
        });
    }

    render() {

        return (
        <div className="foto-info">
            <div className="foto-info-likes">
              {
                  this.state.usuariosCurtiram.map(usuarioCurtiu => { return <Link to={`/timeline/${usuarioCurtiu.login}`} key={usuarioCurtiu.login}>{usuarioCurtiu.login},</Link> })
              }
               curtiram            
            </div>

            <p className="foto-info-legenda">
              <a className="foto-info-autor">autor </a>
              {this.props.foto.comentario}
            </p>

            <ul className="foto-info-comentarios">
              {
                  this.state.comentarios.map(comentario => 
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
        this.state = { curtida: this.props.foto.likeada };
    }

    curtirFoto(evento) {

        evento.preventDefault();
        this._fotoService.curtirFoto(this.props.foto.id)
            .then(usuarioCurtiu => {

                this.setState({ curtida: !this.state.curtida });
                Pubsub.publish('atualiza-usuarios-curtiram', { fotoId: this.props.foto.id, usuarioCurtiu });
            })
            .catch((erro) => console.log(erro));
    }

    comentarFoto(evento) {

        evento.preventDefault();
        this._fotoService
        .comentarFoto(this.props.foto.id, this._inputComentario.value)
        .then(novoComentario => {

            Pubsub.publish('novos-comentarios', {
                fotoId: this.props.foto.id,
                novoComentario
            });
        });

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
            <FotoAtualizacoes foto={this.props.foto} />
        </div>            
        );
    }
}
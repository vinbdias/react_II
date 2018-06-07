import React, { Component } from 'react';
import FotoItem from './Foto';
import FotoService from '../services/FotoService';
import Pubsub from 'pubsub-js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class Timeline extends Component {

    constructor(props) {

        super(props);

        this.state = {fotos: []};
        this._fotoService = new FotoService();    
    }

    componentWillMount() {
        
        this._carregarFotosDeAcordoComUrlEPropriedade();

        this._carregarFotosDeAcordoComABarraDePesquisa();

        this._atualizarCurtidas();

        this._atualizarComentarios();
    }  

    _atualizarCurtidas() {

        Pubsub.subscribe('atualiza-usuarios-curtiram', (topico, infoUsuarioCurtiu) => {
            
            const fotoEncontrada = this.state.fotos.find(foto => foto.id === infoUsuarioCurtiu.fotoId);        

            const possivelCurtida = 
                fotoEncontrada
                .likers
                .find(usuarioCurtiu => 
                    usuarioCurtiu.login === infoUsuarioCurtiu.usuarioCurtiu.login);

            if(possivelCurtida === undefined)
                fotoEncontrada.likers.push(infoUsuarioCurtiu.usuarioCurtiu);
            else {

                const novasCurtidas = fotoEncontrada.likers.filter(usuarioCurtiu => usuarioCurtiu.login !== infoUsuarioCurtiu.usuarioCurtiu.login);                                
                fotoEncontrada.likers = novasCurtidas;                
            }                

            this.setState({ fotos: this.state.fotos });
        });           
    }

    _atualizarComentarios() {                        

        Pubsub.subscribe('novos-comentarios', (topico, infoComentario) => {

            const fotoEncontrada = this.state.fotos.find(foto => foto.id === infoComentario.fotoId);

            const novosComentarios = fotoEncontrada.comentarios.push(infoComentario.novoComentario);

            this.setState({ fotos: this.state.fotos });            
        });        
    }

    _carregarFotosDeAcordoComUrlEPropriedade() {

        let usuario = (this.props.usuario !== undefined) ? this.props.usuario : '';
        this._carregarFotos(usuario);        
    }

    _carregarFotosDeAcordoComABarraDePesquisa() {

        Pubsub.subscribe('timeline', (topico, fotos) => this.setState({ fotos }));        
    }
    
    componentWillReceiveProps(nextProps) {

        if(nextProps.usuario !== undefined)       
            this._carregarFotos(nextProps.usuario);
    }

    _carregarFotos(usuario) {

        this._fotoService
        .obterFotos(usuario)
        .then(fotos => this.setState({fotos: fotos}))
        .catch(erro => console.log(erro));
    }

    curtirFoto(fotoId, fotoService) {

        fotoService.curtirFoto(fotoId)
            .then(usuarioCurtiu => 
                Pubsub.publish('atualiza-usuarios-curtiram', { fotoId, usuarioCurtiu }))
            .catch(erro => console.log(erro));        
    }

    comentarFoto(fotoId, textoComentario, fotoService) {

        fotoService
        .comentarFoto(fotoId, textoComentario)
        .then(novoComentario => 
            Pubsub.publish('novos-comentarios', { fotoId, novoComentario }))
        .catch(erro => console.log(erro));
        
    }

    render() {            

        return (                   
                    <div className="fotos container">
                        <TransitionGroup>
                            {
                                this.state.fotos.map(foto => {
                                    return (   
                                        <CSSTransition key={foto.id} timeout={500} classNames="fade">                                 
                                            <FotoItem foto={foto} curtirFoto={this.curtirFoto} comentarFoto={this.comentarFoto} />
                                        </CSSTransition>
                                    );
                                })
                            }                
                        </TransitionGroup>
                    </div>                        
        );        
    }
}
import React, { Component } from 'react';
import FotoItem from './Foto';
import FotoService from '../services/FotoService';

export default class Timeline extends Component {

    constructor(props) {

        super(props);

        this.state = {fotos: []};
        this._fotoService = new FotoService();
    }

    componentWillMount() {

        let usuario = (this.props.usuario !== undefined) ? this.props.usuario : '';
        this._carregarFotos(usuario);
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

    render() {            
        
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} />)
                }                
            </div>             
        );        
    }
}
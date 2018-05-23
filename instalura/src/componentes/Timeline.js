import React, { Component } from 'react';
import FotoItem from './Foto';
import FotoService from '../services/FotoService';

export default class Timeline extends Component {

    constructor() {

        super();
        this.state = {fotos: []};
        this._fotoService = new FotoService();
    }

    componentDidMount() {

        this._fotoService
        .obterFotos()
        .then(fotos => this.setState({fotos: fotos}))
        .catch(erro => {});
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
import React, { Component } from 'react';
import UsuarioService from '../services/UsuarioService';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {

    constructor() {

        super();
        this._usuarioService = new UsuarioService();
    }

    componentWillMount() {

        this._usuarioService.desautenticar();
    }

    render() {

        return (<Redirect to="../login" />);
    }
}
import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';

export default class App extends Component {

    constructor(props) {

        super(props);

        let usuario = '';
        if(this.props.usuario !== undefined)
            usuario = this.props.usuario;
        else if(this.props.match.params.usuario !== undefined)
            usuario = this.props.match.params.usuario;



        this.state = { usuario: usuario };    
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.match.params.usuario !== undefined)
           this.setState({ usuario: nextProps.match.params.usuario });
    }

    render(data) {

        return (
            <div id="root">
                <div data-reactroot="" className="main">
                    <Header />
                    <Timeline usuario={this.state.usuario} />
                </div>
            </div>
        );
    }
}

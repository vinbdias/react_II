import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div id="root">
            <div data-reactroot="" className="main">
            <Header />
            <Timeline />
            </div> 
        </div>
    );
  }
}

export default App;

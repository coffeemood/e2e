import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './hover.css'
import StatusCard from './Card';
import { Menu } from 'semantic-ui-react';

class App extends Component {
    

  render() {
    let menu = 
        <Menu size='massive' id="mainMenu">
            <Menu.Item>
              <img src={require('./tab.png')} />
            </Menu.Item>
                <h1 style={{color: 'white', width: '100%', fontSize: '32px', paddingLeft: '15px', paddingBottom: '10px', letterSpacing: '1.59px'}}> E2E Test Results </h1>
            <Menu.Item>
              <img src={require('./watchdog.png')} />
            </Menu.Item>
      </Menu>
    
      
    return (
      <div className="App" style={{marginBottom: '10px'}}>
        { menu }
        <h1 id='header'> Account </h1>
            <StatusCard/>  
      </div>
        
    );
  }
}

export default App;

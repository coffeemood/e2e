import React, { Component } from 'react';
import { Card, Icon, Modal, Header } from 'semantic-ui-react';
import './hover.css'

class StatusCard extends Component {
    
  state = { 
    currentSpec: [], 
    showModal: false, 
    data: {
  "start": "2018-05-09T02:01:51.829Z",
  "end": "2018-05-09T02:03:27.277Z",
  "specs": [
    {
      "name": "Show and hide balance toggles between balance and account number",
      "suites": [
        {
          "expect": "Given user is logged in, the default balance will be shown",
          "tests": [
            {
              "title": "When user click on hide balance, then balance will be hidden",
              "state": "passed",
              "duration": 10619
            }
          ]
        }
      ]
    },
    {
      "name": "Verify that user can do a full cashout",
      "suites": [
        {
          "expect": "Given user has bets for cashout, when they do a full cashout",
          "tests": [
            {
              "title": "Then cashout is successful",
              "state": "failed",
              "duration": 9350,
              "error": "CypressError: Timed out retrying: Expected to find element: '.cash-out-actions button', but never found it."
            }
          ]
        }
      ]
    },
    {
      "name": "Verify that user can do a partial cashout",
      "suites": [
        {
          "expect": "Given user has bets for cashout, when they do a partial cashout",
          "tests": [
            {
              "title": "Then cashout is successful",
              "state": "failed",
              "duration": 8564,
              "error": "CypressError: Timed out retrying: Expected to find element: '.cash-out-actions button', but never found it."
            }
          ]
        }
      ]
    },
    {
      "name": "Scenario: Sign up journey without a credit card",
      "suites": [
        {
          "expect": "Given a new customer signing up without adding credit card",
          "tests": [
            {
              "title": "Then user successfully registered with Tab",
              "state": "passed",
              "duration": 16116
            }
          ]
        }
      ]
    },
    {
      "name": "Scenario: User can logout of Tab",
      "suites": [
        {
          "expect": "Given a login user who wish to logout",
          "tests": [
            {
              "title": "Then user successfully log out",
              "state": "passed",
              "duration": 5751
            }
          ]
        }
      ]
    },
    {
      "name": "Verify low deposit pop up",
      "suites": [
        {
          "expect": "Given user with low deposit is logging in ",
          "tests": [
            {
              "title": "Then low deposit pop up is displayed",
              "state": "passed",
              "duration": 6105
            }
          ]
        }
      ]
    },
    {
      "name": "Verify that a user can deposit",
      "suites": [
        {
          "expect": "Given a user with a credit card, deposits $10",
          "tests": [
            {
              "title": "Then deposit is successful",
              "state": "passed",
              "duration": 8595
            }
          ]
        }
      ]
    },
    {
      "name": "Scenario: Verify Responsible Gambling page",
      "suites": [
        {
          "expect": "Given a user is logged in",
          "tests": [
            {
              "title": "Then user can view responsible gambling page",
              "state": "passed",
              "duration": 8562
            }
          ]
        }
      ]
    },
    {
      "name": "Verify Tab rewards in account menu",
      "suites": [
        {
          "expect": "Given user is logged in and account menu is opened",
          "tests": [
            {
              "title": "Then Tab rewards is displayed",
              "state": "passed",
              "duration": 86
            }
          ]
        }
      ]
    },
    {
      "name": "Verify withdrawal",
      "suites": [
        {
          "expect": "Given user with EFT details added is logging in ",
          "tests": [
            {
              "title": "Then successful withdrawal confirmation is displayed",
              "state": "passed",
              "duration": 7253
            }
          ]
        }
      ]
    }
  ]
}

  }

  

  showModal = () => {
      this.setState({showModal: true})
  }
  
  handleCurrentSpec = (spec) => {
      this.setState({currentSpec: spec})
  }

  renderCard = () => {
      
      let suites = this.state.currentSpec.suites
      console.log(this.state.currentSpec)
      let color = this.state.currentSpec.outcome == false ? 'green circle' : 'red circle'
      
      return (
      <Modal open={this.state.showModal} basic size='small' onClose={() => {this.setState({showModal: false, currentSpec: []})}}>
        <Header icon={{color}} content='Suites'  style={{fontSize: '26px'}}/>
        <Modal.Content>
         
         { suites.map((suite) => {
                let tests = suite.tests.map((test)=> {
                    var color = test.state == "passed" ? 'green' : 'red'
                    return ( <div><p style={{color: color, fontSize: '20px'}}> { test.title } - { test.state.toUpperCase() } - {test.duration / 1000 }s </p>
                            <p style={{color: color, fontSize: '14px'}}> { test.error } </p></div>
                    ) 
                })
                
                return ( <div> <p style={{fontSize: '22px'}}> {suite.expect} </p> {tests} </div> )
            })}
         
        </Modal.Content>
        
    </Modal>
          )
  }
    
  render() {
    
    let card = this.state.showModal ? this.renderCard() : ''
    let specs = this.state.data.specs.map((spec) => {
        
        let allResults = []
        
        spec.suites.forEach((suite) => {
            let testResults = suite.tests.map((test) => {
                return test.state
            })
            allResults.push(testResults)
        })
        
        
        
        let bgColor = allResults.some((r) => { return r.indexOf("failed")>=0 }) ? '#F92222' : '#1C9248'
        let icon = allResults.some((r) => { return r.indexOf("failed")>=0 }) ? 'remove' : 'checkmark'
        let iconColor = allResults.some((r) => { return r.indexOf("failed")>=0 }) ? 'red' : 'green'
        spec.outcome = allResults.some((r) => { return r.indexOf("failed")>=0 })
        
        return (
                <div class='hvr-float' id='checkStatusCard' onClick={() => { this.handleCurrentSpec(spec); this.showModal(); }}>
                    <div id='checkStatusDetails' style={{background: bgColor}}>
                        <h3 id='checkStatusHeader'> {spec.name} </h3>
                    </div>
                    <Icon name={icon} color={iconColor} size="big" id='checkStatusIcon'/>
                </div>
        )})
        
        return <div>
             <h4 style={{color: 'white', fontSize: '18px', fontFamily: 'Ubuntu, sans-serif', position: 'fixed', bottom: '2.5%', left: '2.5%'}}> {this.state.data.start.split('T')[0]} </h4>
            <div id='checkStatusGrid'> { specs  } {card} </div>
        </div>
    
    
    
    
  }
}

export default StatusCard;

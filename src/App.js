import './App.css';
import React, { Component } from 'react';
import SchedulerComponent from './components/Scheduler/Scheduler.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="justify-content-center align-items-start">
          <div className="align-self-start m-2">
            <form className="form">
              <a className="m-2" target="_blank" href="https://github.com/shantanugupta/react-scheduler" rel="noopener noreferrer">React Code</a> |
              <a className="m-2" target="_blank" href="https://github.com/shantanugupta/angular1.4-scheduler" rel="noopener noreferrer">AngularJS Code</a> |
              <a className="m-2" target="_blank" href="https://shantanugupta.github.io/angular1.4-scheduler/Index.html" rel="noopener noreferrer">AngularJS UI</a>
              <div className="m-2">
                <SchedulerComponent />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
import './App.css';
import React, { Component } from 'react';
import SchedulerComponent from './components/Scheduler/Scheduler.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <form className="form">
            <SchedulerComponent />
          </form>
        </div>
      </div>
    );
  }
}
export default App;
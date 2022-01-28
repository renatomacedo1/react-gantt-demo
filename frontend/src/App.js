import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import './App.css';

/* const data = {
  data: [
    { id: 1, text: 'Task #1', start_date: '2020-02-12', duration: 3, progress: 0.6 },
    { id: 2, text: 'Task #2', start_date: '2020-02-16', duration: 3, progress: 0.4 }
  ],
  links: [
    { id: 1, source: 1, target: 2, type: '0' }
  ]
}; */

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWYxNzlkZGVhMjgzMzUzYTBjMjg0N2YiLCJuYW1lIjoiUmVuYXRvIiwiaWF0IjoxNjQzMjE1Mzc0LCJleHAiOjE2NDU4MDczNzR9.uf78aiPrK3h6fAtT__PW7dQqRBMFq-YtuNPKeFgMaRU");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};



  //const data = fetchData();

  /* async function fetchData(){
    try {
      const dataRaw = await fetch("http://localhost:5000/api/v1/tasks", requestOptions);
      return dataRaw;
    } catch (error) {
      return "erro em data"
    }
  }  */

  const data = async () => {
    const response = await fetch("http://localhost:5000/api/v1/tasks", requestOptions) // get users list
    const tasks = await response.json() // parse JSON
    const data = tasks // pick first user
    //const userResponse = await fetch(`/users/${user.name}`) // get user data
    //const userData = await userResponse.json() // parse JSON
    return data
  }
  
  data()
  

//console.log('data: ' + data);

class App extends Component {
  state = {
    currentZoom: 'Days',
    messages: []
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [
      newMessage,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  }

  render() {
    const { currentZoom, messages } = this.state;
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={currentZoom}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
        <MessageArea
          messages={messages}
        />
      </div>
    );
  }
}

export default App;


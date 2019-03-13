import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';



export default class App extends Component {
  constructor (props){
   super(props); 
   this.state = {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [] // messages coming from the server will be stored here as they arrive
  };
  }

  

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.addEventListener('open', (event) => {
      console.log('Connected to server');
    });
    this.socket.addEventListener('message', (event) =>{
      const messageFromServer = JSON.parse(event.data);
      console.log('here: ', messageFromServer);
      const oldMessages = this.state.messages;
      this.setState({messages: [...oldMessages, messageFromServer]})
      });


    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  _newMessage = (event) => {
    if (event.key === 'Enter') {
      const userMessage = {username: `${this.state.currentUser.name}`, content: event.target.value};
      // const updateMessages = this.state.messages.concat(userMessage);
      console.log(userMessage);
      this.socket.send(JSON.stringify(userMessage));
      event.target.value = "";
    }  
  }
  render() {
    return (
      <div className="container">
      <MessageList messages = {this.state.messages}/>
      <ChatBar currentUser = {this.state.currentUser} onEnter = {this._newMessage}/>
      </div>
    );
  }
}

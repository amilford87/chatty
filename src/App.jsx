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
  }

  _newMessage = (message) => {
      this.socket.send(JSON.stringify(message));
  }

  _changeUserName = (user) => {
    this.socket.send(JSON.stringify(user));
    let newUser = user.changedUser;
    this.setState({currentUser: {name: newUser}});
    console.log(user.content);
  }

  

  render() {
    return (
      <div className="container">
      <MessageList messages = {this.state.messages}/>
      <ChatBar currentUser = {this.state.currentUser} chatMessage = {this._newMessage} changeUser={this._changeUserName}/>
      </div>
    );
  }
}

import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './Navbar.jsx';



export default class App extends Component {
  constructor (props){
   super(props); 
   this.state = {
    currentUser: {name: "Anonymous"},
    messages: [], // messages coming from the server will be stored here as they arrive
    userCount: 0,
    color: ""
  };
  }

  

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    console.log(this.socket);
    this.socket.addEventListener('open', (event) => {
      console.log('Connected to server ');
    });
    this.socket.addEventListener('message', (event) =>{
      const messageFromServer = JSON.parse(event.data);
      if (messageFromServer.type === "userCount") {
        this.setState({userCount: messageFromServer.clients})
      } else{
      const oldMessages = this.state.messages;
      this.setState({messages: [...oldMessages, messageFromServer]})
      }
      });
  }

  _newMessage = (message) => {
    if (message.content.match(/http.*(jpg|gif|png|jpeg)$/)){
      const findImage = message.content.search(/http.*(jpg|gif|png|jpeg)$/);
      message.image = message.content.substring(findImage);
      console.log(message.image);
      message.content = message.content.replace(message.image, "");
      console.log(message.content);
    }
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
      <NavBar users={this.state.userCount}/>
      <MessageList messages = {this.state.messages}/>
      <ChatBar currentUser = {this.state.currentUser} chatMessage = {this._newMessage} changeUser={this._changeUserName}/>
      </div>
    );
  }
}

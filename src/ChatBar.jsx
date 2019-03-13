import React, {Component} from 'react';

export default class ChatBar extends Component { 

  chatBarMessage = (event) => {
    if (event.key === 'Enter') {
      const userMessage = {username: `${this.props.currentUser.name}`, content: event.target.value, type: "postMessage"};
      console.log(userMessage);
      this.props.chatMessage(userMessage);
      event.target.value = "";
    }  
  }

  changeUser = (event) => {
    if (event.key === 'Enter'){
      const newUser = { content: `${this.props.currentUser.name} has changed their name to ${event.target.value}`, changedUser: event.target.value, type: "postNotification"};
      this.props.changeUser(newUser);
    }
  }


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} onKeyDown={this.changeUser}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.chatBarMessage}/>
      </footer>
    );
  }
}
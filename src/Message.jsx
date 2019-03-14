import React, {Component} from 'react';

export default class Message extends Component {
  
  
  render() {
    return (
      <main className="messages">
        {this.props.message.type === 'incomingMessage' ? (
        <div className="message">
          <span className="message-username" style={this.props.message.color}>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>) : (
          <div>
          <span className="message system">{this.props.message.content}</span>
          </div>
         )}
      </main>
    );
  }
}
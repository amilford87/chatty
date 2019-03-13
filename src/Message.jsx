import React, {Component} from 'react';

export default class Message extends Component {
  
  
  render() {
    const systemMessage = (
      <div className="message system">
        {this.props.message.system}
      </div>
    )
    return (
      <main className="messages">
        {this.props.message.type === 'incomingMessage' ? (
        <div className="message">
          <span className="message-username">{this.props.message.username}</span>
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
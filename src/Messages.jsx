import { Component } from "react";

class Messages extends Component {
    render() {
        const {messages} = this.props;
        return (
            <ul className="Messages-list">
                {messages.map(message => this.showMessage(message))}
            </ul>
        );
    }

    showMessage = (message) => {
        const {member, text} = message;
        const {currentMember} = this.props;
        const messageFromMe = member.id === currentMember.id;
        const setClass = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li key={member.id} className={setClass}>
                <span className="avatar" style={{backgroundColor: member.clientData.color}}></span>
                <div className="Message-content">
                    <div className="username">
                        {member.clientData.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }
}

export default Messages;
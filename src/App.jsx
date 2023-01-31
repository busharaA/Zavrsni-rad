import { Component } from "react";
import Messages from "./Messages";
import Input from "./Input";

const randomName = () => {
    const firstNames = ["shiny", "happy", "white", "black", "big", "small", "minty", "cherry", "pink", "green", "dark", "dancing", "natural", "moonlight", "living", "king", "little", "lilly", "silky", "sun", "winter", "tiny", "angry", "silly", "billy", "cool", "apple", "orange", "red", "blue"];
    const lastNames = ["daze", "bear", "butler", "princess", "jack", "dog", "city", "unicorn", "knight", "girl", "boy", "cat", "moon", "sun", "jumper", "sea", "ocean", "dead", "mage", "rogue", "dwarf", "hero", "magician", "hermit", "star", "lion", "sky", "beach", "tree", "mountain"];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return firstName + " " + lastName;
}
    
const randomColor = () => {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
    state = {
        messages: [],
        member: {
            color: randomColor(),
            username: randomName()
        }
    }

    constructor() {
        super();
        this.drone = new window.Scaledrone("3Srko3xJdUWd657i", {
            data: this.state.member
        });
        this.drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const member = {...this.state.member};
            member.id = this.drone.clientId;
            this.setState({member});
        });
        const room = this.drone.subscribe("observable-room");
        room.on('data', (data, member) => {
            const messages = this.state.messages;
            messages.push({member, text: data});
            this.setState({messages});
        });
    }

    render() {
        const { messages, member } = this.state;

        return (
            <div className="App">
                <div className="App-header">
                    <h1>Finals Chat App</h1>
                </div>
                <Messages messages={messages} currentMember={member} />
                <Input onSendMessage={this.handleSendMessage} />
            </div>
        );
    }

    handleSendMessage = (message) => {
        this.drone.publish({
            room: "observable-room",
            message
        });
    }
};

export default App;

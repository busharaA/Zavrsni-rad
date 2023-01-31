import { Component } from "react";

class Input extends Component {
    state = {
        text: "",
    };

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSendMessage(this.state.text);
        this.setState({
            text: ""
        });
    }

    render() {
        return (
            <div className="Input">
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        value={this.state.text}
                        placeholder="Type a text and press Enter"
                        autoFocus={true}
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}

export default Input;

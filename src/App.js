import React from "react";
import CodeEditor from "./CodeEditor.js"
import Animation from "./Animation.js"
import AceEditor from "react-ace";

class App extends React.Component {
    constructor() {
        super();
        this.handleResponse = this.handleResponse.bind(this)
        this.state = {
            value: ""
        }
    }

    handleResponse(data) {
        console.log(data)
        // const newValue = this.state.value + "\n" + data
        const newValue = data
        this.setState({
            value: newValue
        })
    }

    render() {
        return (
            <div className="d-flex flex-wrap justify-content-center align-content-center align-items-center w-100 h-100 position-absolute">
                <CodeEditor onResponse={this.handleResponse}/>
                <Animation value={this.state.value}/>
                {/* <AceEditor /> */}
            </div>
        );
    }
}

export default App;
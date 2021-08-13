import React from "react";
import ControlPanel from "./ControlPanel.js"
import CodeEditor from "./CodeEditor.js"
import Animation from "./Animation.js"
import { v4 as uuidv4 } from "uuid"

class App extends React.Component {
    constructor() {
        super();
        this.executeCode = this.executeCode.bind(this)
        this.onCodeChange = this.onCodeChange.bind(this)
        this.onLevelChange = this.onLevelChange.bind(this)
        this.state = {
            code: "",
            level: 1,
            // level to -1 to avoid code deletion
            view: "",
        }
    }

    executeCode() {
        fetch('http://192.168.1.72:5000/code', {
            method: 'POST',
            body: JSON.stringify({
                uuid: localStorage.getItem('uuid'),
                level: this.state.level,
                last_code: this.state.code,
            })
        })
        .catch((error) => {
            console.log('Error:', error);
        })

        fetch('http://192.168.1.72:5000/execute?uuid='+localStorage.getItem('uuid')+'&level='+this.state.level, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            this.onViewChange(data['result'])
            console.log(data)
            console.log(data['result'])
            console.log(typeof(data['result']))
            console.log(this.state.view)
        })
        .catch((error) => {
            console.log('Error:', error);
        })
    }

    onViewChange(view) {
        this.setState({view: view})
    }

    onCodeChange(code) {
        this.setState({code: code})
    }

    onLevelChange(level) {
        fetch('http://192.168.1.72:5000/code', {
            method: 'POST',
            body: JSON.stringify({
                uuid: localStorage.getItem('uuid'),
                level: this.state.level,
                last_code: this.state.code,
            })
        })
        .catch((error) => {
            console.log('Error:', error);
        })

        this.setState({level: level})
        fetch('http://192.168.1.72:5000/progress', {
            method: 'POST',
            body: JSON.stringify({
                uuid: localStorage.getItem('uuid'),
                level: level
            })
        })
        .catch((error) => {
            console.log('Error:', error);
        })

        fetch('http://192.168.1.72:5000/code?uuid='+localStorage.getItem('uuid')+'&level='+level, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            this.onCodeChange(data['code'])
        })
        .catch((error) => {
            console.log('Error:', error);
        })
    }

    componentDidMount() {
        if (!localStorage.getItem('uuid')) {
            localStorage.setItem('uuid', uuidv4())

            fetch('http://192.168.1.72:5000/progress', {
                method: 'POST',
                body: JSON.stringify({
                    uuid: localStorage.getItem('uuid'),
                    level: 1
                })
            })
            .catch((error) => {
                console.log('Error:', error);
            })
        } else {
            fetch('http://192.168.1.72:5000/progress?uuid=' + localStorage.getItem('uuid'), {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                this.onLevelChange(data['level'])
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        }

        // ev.preventDefault()
        // fetch('http://192.168.1.72:5000/code', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         uuid: localStorage.getItem('uuid'),
        //         level: this.state.level,
        //         last_code: this.state.code,
        //     })
        // })
        // .catch((error) => {
        //     console.log('Error:', error);
        // })
        // return ev.returnValue = 'Are you sure you want to close?';
    }

    render() {
        return (
            <div className="d-flex flex-wrap justify-content-center align-content-center align-items-center w-100 h-100 position-absolute">
                <div className="w-50 h-100">
                    <ControlPanel 
                        onLevelChange={this.onLevelChange}
                        executeCode={this.executeCode} />
                    <CodeEditor
                        level={this.state.level}
                        code={this.state.code}
                        onLevelChange={this.onLevelChange}
                        onCodeChange={this.onCodeChange}
                        onResponse={this.handleResponse} />
                </div>
                
                <Animation level={this.state.view}/>
            </div>
        );
    }
}

export default App;
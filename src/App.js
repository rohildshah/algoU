import React from "react";
import ControlPanel from "./ControlPanel.js"
import AceEditor from "react-ace";
import ErrorBox from "./ErrorBox.js"
import Animation from "./Animation.js"
import { v4 as uuidv4 } from "uuid"
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-github'
import "ace-builds/src-min-noconflict/ext-language_tools";

class App extends React.Component {
    constructor() {
        super();
        this.postToCode = this.postToCode.bind(this)
        this.executeCode = this.executeCode.bind(this)
        this.onCodeChange = this.onCodeChange.bind(this)
        this.onLevelChange = this.onLevelChange.bind(this)
        this.state = {
            code: "",
            level: -1,
            stdout: "",
        }
    }

    postToCode() {
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
    }

    postToProgress(level) {
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
    }

    executeCode() {
        fetch('http://192.168.1.72:5000/execute', {
            method: 'POST',
            body: JSON.stringify({
                uuid: localStorage.getItem('uuid'),
                level: this.state.level,
                code: this.state.code
            })
        })
        .then(response => response.json())
        .then(data => {
            const date = new Date();
            const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            const m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            const time = `[${h}:${m}:${s}] `;

            const returncode = data['returncode']
            const stdout = data['stdout']
            const stderr = data['stderr'].split("\n")

            if (stderr.length != 1) {
                this.onStdoutChange(time + stderr[stderr.length - 2])    
            }
            if (stdout != "") {
                console.log(time + stdout)
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        })
    }

    onStdoutChange(stdout) {
        this.setState({stdout: this.state.stdout == "" ? stdout : this.state.stdout + "\n" + stdout})
    }

    onCodeChange(code) {
        this.setState({code: code})
    }

    onLevelChange(level) {
        this.postToCode()

        this.setState({level: level})

        this.postToProgress(level)

        fetch('http://192.168.1.72:5000/code?uuid='+localStorage.getItem('uuid')+'&level='+level, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            this.onCodeChange(data['code'].replaceAll('\\n', '\n'))
        })
        .catch((error) => {
            console.log('Error:', error);
        })
    }

    componentDidMount() {
        if (!localStorage.getItem('uuid')) {
            localStorage.setItem('uuid', uuidv4())

            this.onLevelChange(1)
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
    }

    render() {
        return (
            <div className="container-xxl h-100 p-3">                
                <div className="row h-100">
                    <div className="col-6">
                        <ControlPanel
                            onLevelChange={this.onLevelChange}
                            executeCode={this.executeCode} 
                            postToCode={this.postToCode} />
                        <AceEditor
                            mode="python"
                            theme="github"
                            showPrintMargin={false}
                            highlightActiveLine={false}
                            enableLiveAutocompletion={true}
                            onChange={this.onCodeChange}
                            value={this.state.code}
                            className="w-100"
                            style={{height: '68%'}} />
                        
                        <ErrorBox 
                            stdout={this.state.stdout} />
                    </div>
                    <div className="col-6">
                        <Animation />
                    </div>
                </div>
                
            </div>
        );
    }
}

export default App;
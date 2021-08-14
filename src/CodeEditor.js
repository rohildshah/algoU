import React from "react";
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-github'
import "ace-builds/src-min-noconflict/ext-language_tools";

class CodeEditor extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="">
                <AceEditor
                    mode="python"
                    theme="github"
                    showPrintMargin={false}
                    highlightActiveLine={false}
                    enableLiveAutocompletion={true}
                    onChange={this.props.onCodeChange}
                    value={this.props.code}
                    className="w-100"
                />
            </div>
        )
    }
}

export default CodeEditor;
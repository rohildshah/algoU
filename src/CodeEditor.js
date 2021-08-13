import React from "react";
import AceEditor from "react-ace";

class CodeEditor extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="w-100 h-75">
                <AceEditor
                    mode="python"
                    onChange={this.props.onCodeChange}
                    value={this.props.code}
                    className="w-100 h-100"
                />
            </div>
        )
    }
}

export default CodeEditor;
import React from "react";
import AceEditor from "react-ace";

class CodeEditor extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this)
        this.state = {
            value: "from SortableList import SortableList\n\ndef bubbleSort(arr):\n    \n\narr = SortableList([64, 34, 25, 12, 22, 11, 90])\n\nbubbleSort(arr)\n\nfor i in range(len(arr.data)):\n    print('% d,' % arr.data[i])\n\nprint(arr.swaps)"
        }
    }

    onChange(newValue) {
        this.setState({
            value: newValue
        })
    }

    render() {
        return (
            <div className="w-50 h-100">
                <AceEditor
                    mode="python"
                    onChange={this.onChange}
                    value={this.state.value}
                    className="w-100 h-75"
                />

                
                <button type="button" onClick={() => {
                    const data = { code: this.state.value }
                    fetch('http://192.168.1.72:5000', {
                        method: 'POST',
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        this.props.onResponse(data['result'])
                    })
                    .catch((error) => {
                        console.log('Error:', error);
                    });
                }} className="w-100 h-25">Send!</button>
            </div>
        )
    }
}

export default CodeEditor;
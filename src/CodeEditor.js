import React from "react";
import AceEditor from "react-ace";

class CodeEditor extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this)
        this.onChangeLevel = this.onChangeLevel.bind(this)
        this.state = {
            value: "from SortableList import SortableList\n\ndef bubbleSort(arr):\n    \n\narr = SortableList([64, 34, 25, 12, 22, 11, 90])\n\nbubbleSort(arr)\n\nfor i in range(len(arr.data)):\n    print('% d,' % arr.data[i])\n\nprint(arr.swaps)",
            level: 1
        }
    }

    onChange(newValue) {
        this.setState({
            value: newValue
        })
    }

    onChangeLevel(newValue) {
        this.setState({
            level: newValue
        })
    }

    render() {
        const options = [
            { value: 1, label: 'Level 1: Sorting' },
            { value: 2, label: 'Level 2: placeholder' },
            { value: 3, label: 'Level 3: placeholder' }
        ]
        
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
                }} className="">Send!</button>
                {/* w-100 h-25 */}

                <div onClick={() => {
                    this.onChangeLevel(this.state.level != 3 ? this.state.level + 1 : 1)
                }}>{this.state.level}</div>

                <button type="button" onClick={() => {
                    const data = { level: this.state.level }
                    fetch('http://192.168.1.72:5000', {
                        method: 'POST',
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        this.onChange(data['result'])
                    })
                    .catch((error) => {
                        console.log('Error:', error);
                    });
                }}>Refresh!</button>
            </div>
        )
    }
}

export default CodeEditor;
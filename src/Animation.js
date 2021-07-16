import React from "react";

class Animation extends React.Component {
    render() {
        return (
            <div className="w-50 h-100" style={{backgroundColor: '#eee'}}>
                {this.props.value}
            </div>
        )
    }
}

export default Animation;
import React from "react";

class Animation extends React.Component {
    render() {
        return (
            <div className="w-100 h-100" style={{backgroundColor: '#eee'}}>{this.props.level}</div>
        )
    }
}

export default Animation;
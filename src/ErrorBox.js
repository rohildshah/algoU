import React from "react";

class ErrorBox extends React.Component {
    render() {
        return (
            <div className="mt-3 p-3" style={{backgroundColor: '#eee', height: '25%', fontSize: '14px'}}>
                <p className="mb-2">
                    Standard Error
                </p>
                <pre className="p-2" style={{backgroundColor: '#fff', height: 'calc(100% - 29px)', borderRadius: '4px'}}>
                    {this.props.stdout}
                </pre>
            </div>
        )
    }
}

export default ErrorBox;
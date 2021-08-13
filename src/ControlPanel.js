import React from "react";

class ControlPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="w-100 d-flex justify-content-center p-3">
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#levelSelect">Level Select</button>

                <div className="modal fade" id="levelSelect" tabIndex="-1" role="dialog" aria-labelledby="levelSelectTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Select a Level</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" value="1" onClick={(event) => {
                                    this.props.onLevelChange(event.target.value)
                                }}>Level 1</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" value="2" onClick={(event) => {
                                    this.props.onLevelChange(event.target.value)
                                }}>Level 2</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" value="3" onClick={(event) => {
                                    this.props.onLevelChange(event.target.value)
                                }}>Level 3</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-primary btn-sm" onClick={() => {
                    this.props.executeCode()
                }}>Execute Code</button>
            </div>
        )
    }
}

export default ControlPanel;
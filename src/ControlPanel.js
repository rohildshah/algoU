import React from "react";

class ControlPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="d-flex flex-row pb-3">
                <button type="button" className="btn btn-primary d-flex align-items-center mr-2" data-toggle="modal" data-target="#levelSelect" style={{lineHeight: '20px'}}>
                    <i className="bi bi-grid-3x3-gap-fill"></i>
                </button>

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

                <button type="button" className="btn btn-primary d-flex align-items-center mr-2" style={{lineHeight: '20px', padding: '3px 8px 3px 9px'}} onClick={() => {
                    this.props.executeCode()
                }}>
                    <i className="bi bi-play-fill" style={{fontSize: '23px'}}></i>
                </button>

                <button type="button" className="btn btn-primary d-flex align-items-center mr-2" style={{lineHeight: '20px'}} onClick={() => {
                    this.props.postToCode()
                }}>
                    <i className="bi bi-bookmark-fill"></i>
                </button>

                <button type="button" className="btn btn-primary d-flex align-items-center mr-2" style={{lineHeight: '20px'}}>
                    <i className="bi bi-gear-fill"></i>
                </button>

            </div>
        )
    }
}

export default ControlPanel;
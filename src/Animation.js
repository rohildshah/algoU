import React from "react";

class Animation extends React.Component {
    click() {
        if (document.getElementById('a').getAttribute('y') < '25%') {
            d3.select('#a')
            .transition()
            .duration(2000)
            .attr('y', '50%')
        } else {
            d3.select('#a')
            .transition()
            .duration(2000)
            .attr('y', '12.5%')
        }

        
    }

    render() {
        return (
            <div className="w-100 h-100" style={{backgroundColor: '#eee'}}>
                <svg id="canvas" className="w-100 h-100" onClick={this.click}>
                    <rect id="a" x="20%" y="12.5%" width="15%" height="5%" fill="#888888"></rect>
                    <rect x="20%" y="20%" width="25%" height="5%" fill="#888888"></rect>
                    <rect x="20%" y="27.5%" width="35%" height="5%" fill="#888888"></rect>
                    <rect x="20%" y="35%" width="45%" height="5%" fill="#888888"></rect>
                    <rect x="20%" y="42.5%" width="55%" height="5%" fill="#888888"></rect>
                    <rect x="20%" y="50%" width="65%" height="5%" fill="#888888"></rect>
                </svg>
            </div>
        )
    }
}

export default Animation;
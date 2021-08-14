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
            .attr('y', '10%')
        }

        
    }

    render() {
        return (
            <div className="w-100 h-100" style={{backgroundColor: '#eee'}}>
                <svg id="canvas" className="w-100 h-100" onClick={this.click}>
                    <rect id="a" x="25%" y="10%" width="15%" height="5%"></rect>
                    <rect x="25%" y="20%" width="30%" height="5%"></rect>
                    <rect x="25%" y="30%" width="45%" height="5%"></rect>
                    <rect x="25%" y="40%" width="60%" height="5%"></rect>
                </svg>
            </div>
        )
    }
}

export default Animation;
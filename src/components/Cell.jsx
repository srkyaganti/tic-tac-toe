import React from 'react';
import '../css/styles.css'

class Cell extends React.Component {
    render () {
        return (
            <div 
                className='cell'
                onClick={() => this.props.onCellClick(this.props.rowNumber, this.props.columnNumber, this.props.currentPlayer)}
                style={{backgroundColor:this.props.marking}}
            >
            </div>
        );
    }
}

export default Cell;
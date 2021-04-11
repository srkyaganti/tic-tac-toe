import React from 'react';
import { Row } from 'react-bootstrap';
import Cell from './Cell';

class GridRow extends React.Component {
    render () {
        const cells = [];
        
        for (let i = 0; i < this.props.gridSize; i++) {
            cells.push(
                <Cell 
                    onCellClick={this.props.onCellClick} 
                    rowNumber={this.props.rowNumber} 
                    columnNumber={i} 
                    marking={this.props.markings[i]}
                    currentPlayer={this.props.currentPlayer}
                />
            );
        }

        return (
            <Row className="justify-content-md-center">
                {cells}
            </Row>
        );
    }
}

export default GridRow;
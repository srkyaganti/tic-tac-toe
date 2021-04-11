import React from 'react';
import GridRow from './GridRow';

class Grid extends React.Component {    
    render() {
        const { gridSize, playerCount, markings } = this.props;
        
        const rows = [];
        
        for (let i = 0; i < gridSize; i++) {
            rows.push(
                <GridRow 
                    gridSize={gridSize} 
                    onCellClick={this.props.onCellClick}
                    rowNumber={i} 
                    markings={this.props.markings.slice(gridSize * i, gridSize * (i+ 1))}
                    currentPlayer={this.props.currentPlayer}
                />
            );
        }

        return (
            <React.Fragment>
                {rows}
            </React.Fragment>
        );
    }
}

export default Grid;
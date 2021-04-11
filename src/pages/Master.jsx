import React from 'react';
import { Container, Row, Col, Button, Modal, Badge } from 'react-bootstrap'
import Grid from '../components/Grid';
import Config from '../config'
import randomColor from 'randomcolor';

class Master extends React.Component {    
    constructor(props) {
        super(props);
        
        const { gridSize, playerCount }  = Config;
        const defaultCellColor = '#FAFAFA';
        
        this.onCellClick = this.onCellClick.bind(this);
        this.isCellEmpty = this.isCellEmpty.bind(this);
        this.finishGame = this.finishGame.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.getPlayersLegend = this.getPlayersLegend.bind(this);
        
        this.state = {
            defaultCellColor,
            gridSize,
            playerCount,
            markings: new Array(gridSize * gridSize).fill(defaultCellColor),
            playerColors: this.getPlayerColors(playerCount),
            currentPlayer: 0,
            gameComplete: false
        }        
    }

    getPlayerColors(playerCount) {
        return Array.from({length: playerCount}, () => randomColor())
    }

    isValidConfig(gridSize, playerCount) {
        return playerCount <= gridSize;
    }

    isCellEmpty(row, column) {
        const gridSize = this.state.gridSize;

        if (row < gridSize && column < gridSize) {
            const colorCode = this.state.markings[row * gridSize + column];
            return colorCode == this.state.defaultCellColor
        } else {
            throw 'Invalid cell position provided'
        }
    }

    onCellClick(row, column, currentPlayer) {
        if (this.isCellEmpty(row, column)) {
            this.setState(prevState => {
                const gridSize = prevState.gridSize;
                
                let markings = [...prevState.markings];
                markings[row * gridSize + column] = prevState.playerColors[currentPlayer];
                
                return {
                    ...prevState,
                    currentPlayer: (prevState.currentPlayer + 1) % prevState.playerCount,
                    markings
                }
            }, () => this.checkEndState(currentPlayer))
        }        
    }

    checkEndState(currentPlayer) {
        const currentPlayerColor = this.state.playerColors[currentPlayer];
        const gridSize = this.state.gridSize;

        // Checking rows
        for (let i = 0; i < gridSize; i++) {
            const firstColor = this.state.markings[i * gridSize];
    
            if (firstColor != currentPlayerColor) {
                continue;
            }

            let streakMaintained = true;

            for (let j = 1; j < gridSize; j++) {
                if (firstColor.localeCompare(this.state.markings[i * gridSize + j]) !== 0) {
                    streakMaintained = false;
                    break;
                }
            }

            if (streakMaintained) {
                this.finishGame();
            }
        }

        // Checking columns
        for (let i = 0; i < gridSize; i++) {
            const firstColor = this.state.markings[i];
            
            if (firstColor != currentPlayerColor) {
                continue;
            }

            let streakMaintained = true;

            for (let j = 1 ; j < gridSize; j++) {
                if (firstColor.localeCompare(this.state.markings[j * gridSize + i]) !== 0) {
                    streakMaintained = false;
                    break;
                }
            }

            if (streakMaintained) {
                this.finishGame();
            }
        }

        // Checking from top left to bottom right
        let firstColor = this.state.markings[0];
        if (firstColor == currentPlayerColor) {
            let streakMaintained = true;
            
            for (let i = 1; i < gridSize; i++) {
                if (this.state.markings[i * (gridSize + 1)] != firstColor) {
                    streakMaintained = false;
                    break;
                }    
            }
            if (streakMaintained) {
                this.finishGame();
            }
        }

        // Checking from bottom left to top right
        firstColor = this.state.markings[gridSize - 1];
        if (firstColor == currentPlayerColor) {
            let streakMaintained = true;

            for (let i = 1; i < gridSize; i++) {
                if (this.state.markings[i * gridSize + (gridSize - 1 -i)] != firstColor) {
                    streakMaintained = false;
                    break;
                }
            }

            if (streakMaintained) {
                this.finishGame();
            }
        }
    }

    finishGame() {
        this.setState(prevState => {
            return {
                ...prevState,
                gameComplete: true
            }
        });
    }

    getBoard() {
        return (
            <React.Fragment>
                <Row>
                    <Button variant="link" onClick={this.resetGame}>Reset</Button>
                </Row>
                <Row>
                    {this.getPlayersLegend()}
                </Row>
                <Grid 
                    {...this.state} onCellClick={this.onCellClick}
                />
            </React.Fragment>
        );
    }

    getPlayersLegend() {
        const players = []
        
        for (let i = 1; i <= this.state.playerCount; i++) {
            players.push(
                <Row>
                    <Col>
                        <h3><Badge style={{backgroundColor: this.state.playerColors[i-1]}}>Player {i}</Badge></h3>
                    </Col>
                </Row>
            );
        }

        return (
            <>
                {players}
            </>
        );
    }

    getValidationFailureMessage() {
        return (
            <div> INVALID CONFIG. Player count cannot be greater than grid size. </div>
        );
    }

    resetGame() {
        this.setState(prevState => {
            return {
                ...prevState,
                markings: new Array(prevState.gridSize * prevState.gridSize).fill(prevState.defaultCellColor),
                currentPlayer: 0,
                gameComplete: false  
            }
        })
    }

    render() {
        return (
            <>
                <Container fluid>
                    <Row style={{display: 'flex', alignItems: 'center'}}>
                        <Col xs={1} md={2} lg={4}></Col>
                        <Col xs={10} md={8} lg={4}>
                            {
                                this.isValidConfig(this.state.gridSize, this.state.playerCount)
                                ? this.getBoard()
                                : this.getValidationFailureMessage()
                            }
                        </Col>
                        <Col xs={1} md={2} lg={4}></Col>
                    </Row>
                </Container>
                <Modal show={this.state.gameComplete} onHide={this.resetGame}>
                    <Modal.Header closeButton>
                        <Modal.Title>You Won!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you won the game!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={this.resetGame}>
                        Start Over!
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Master;
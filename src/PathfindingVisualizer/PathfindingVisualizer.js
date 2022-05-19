import React from 'react';
import Node from "./Node/Node";

import './PathfindingVisualizer.css'
import BFS from "../algorithms/BFS";

const ROWS = 25;
const COLS = 50;
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const TARGET_NODE_ROW = 11;
const TARGET_NODE_COL = 25;

// enum representing different node states
export const NState = Object.freeze({
    start: 0,
    target: 1,
    wall: 2,
    visited: 3,
    unvisited: 4,
})

export default class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        const nodesGrid = this.createNodes();

        this.state = {
            nodesGrid: nodesGrid,
            rows: ROWS,
            cols: COLS,
            startNode: nodesGrid[START_NODE_ROW][START_NODE_COL],
            targetNode: nodesGrid[TARGET_NODE_ROW][TARGET_NODE_COL],
            mouseIsPressed: false,
        };
    }

    createNode(row, col, isVisited=false) {
        // check if node is start or target -- other state is unvisited
        let state;
        if (row === START_NODE_ROW && col === START_NODE_COL) { state = NState.start; }
        else if (row === TARGET_NODE_ROW && col === TARGET_NODE_COL) { state = NState.target; }
        else { state = NState.unvisited; }

        return {
            col: col,
            row: row,
            state: state,
        }
    }

    createNodes() {
        const nodesGrid = [];
        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLS; col++) {
                // add a new node for every
                const currentNode = this.createNode(row, col);
                currentRow.push(currentNode);
            }
            nodesGrid.push(currentRow);
        }

        return nodesGrid;
    }

    visualizeBFS() {
        // create a shallow copy so we don't edit the nodes in our state
        const shallowCopyNodesGrid = JSON.parse(JSON.stringify(this.state.nodesGrid));
        const visitedNodesInOrder = BFS(shallowCopyNodesGrid, this.state.startNode, this.state.targetNode);

        visitedNodesInOrder.forEach((node, idx) => {
            setTimeout(() => {
                const newNodesGrid = this.state.nodesGrid.slice();
                newNodesGrid[node.row][node.col].state = NState.visited;
                this.setState({nodesGrid: newNodesGrid})
            }, 10 * idx);
        })
    }

    handleMouseDown = (row, col) => {
        this.setState({
            nodesGrid: getNewGridWithWallToggled(this.state.nodesGrid, row, col),
            mouseIsPressed: true
        })
    }

    handleMouseEnter = (row, col) => {
        if (!this.state.mouseIsPressed) return;
        this.setState({
            nodesGrid: getNewGridWithWallToggled(this.state.nodesGrid, row, col)
        })
    }

    handleMouseUp = () => {
        this.setState({mouseIsPressed: false})
    }

    render () {
        return (
            <>
                <button onClick={() => this.visualizeBFS()}>
                    Visualize BFS Algorithm
                </button>
                <button onClick={() => {this.setState({nodesGrid: this.createNodes()})}}>
                    Reset
                </button>

                <div className="gridWrapper">
                    {this.state.nodesGrid.map((row, rowIdx) => {
                        return (
                            <div className="row" key={rowIdx}>
                                {row.map(node =>
                                    <Node
                                        key={node.row + "-" + node.col}
                                        row={node.row}
                                        col={node.col}
                                        state={node.state}
                                        onMouseDown={this.handleMouseDown}
                                        onMouseEnter={this.handleMouseEnter}
                                        onMouseUp={this.handleMouseUp}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}

function getNewGridWithWallToggled(nodesGrid,  row, col) {
    const newNodesGrid = nodesGrid.slice();

    switch (newNodesGrid[row][col].state) {
        case NState.wall:
            newNodesGrid[row][col].state = NState.unvisited; break;
        case NState.unvisited:
            newNodesGrid[row][col].state = NState.wall; break;
        default:
            break;
    }

    return newNodesGrid;
}

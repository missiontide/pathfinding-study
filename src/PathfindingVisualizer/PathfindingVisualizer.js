import React from 'react';
import Node from "./Node/Node";

import './PathfindingVisualizer.css'
import BFS from "../algorithms/BFS";

const ROWS = 25;
const COLS = 50;
const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const TARGET_NODE_ROW = 10;
const TARGET_NODE_COL = 10;

export default class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        const nodes = this.createNodes();
        this.state = {
            nodes: nodes,
            rows: ROWS,
            cols: COLS,
            startNode: nodes[START_NODE_ROW][START_NODE_COL], // is set in componentDidMount
            targetNode: nodes[TARGET_NODE_ROW][TARGET_NODE_COL],
        };
    }

    createNode = (row, col, isVisited=false) => {
        return {
            col: col,
            row: row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isTarget: row === TARGET_NODE_ROW && col === TARGET_NODE_COL,
            isVisited: isVisited,
        }
    }

    createNodes = () => {
        const nodes = [];
        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLS; col++) {
                // add a new node for every
                const currentNode = this.createNode(row, col);
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }

        return nodes;
    }

    visualizeBFS() {
        // create a shallow copy so we don't edit the nodes in our state
        const shallowCopyNodes = JSON.parse(JSON.stringify(this.state.nodes));
        const visitedNodesInOrder = BFS(shallowCopyNodes, this.state.startNode, this.state.targetNode);

        visitedNodesInOrder.forEach((node, idx) => {
            setTimeout(() => {
                const nodes = this.state.nodes.slice();
                nodes[node.row][node.col].isVisited = true;
                this.setState({nodes: nodes})
            }, 15 * idx);
        })
    }

    render () {
        console.log("render")
        const {nodes} = this.state;

        return (
            <>
                <button onClick={() => this.visualizeBFS()}>
                    Visualize BFS Algorithm
                </button>

                <div className="gridWrapper">
                    {nodes.map((row, rowIdx) => {
                        return (
                            <div className="row" key={rowIdx}>
                                {row.map((node, nodeIdx) =>
                                    <Node
                                        key={node.row + "-" + node.col}
                                        row={node.row}
                                        col={node.col}
                                        isStart={node.isStart}
                                        isTarget={node.isTarget}
                                        isVisited={node.isVisited}
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
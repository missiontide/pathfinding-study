import React from 'react';
import Node from "./Node/Node";

import './PathfindingVisualizer.css'


export default class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            rows: 25,
            cols: 50,
            startNode: {row: 5, col: 5},
            finishNode: {row: 20, col: 40},
        };
    }

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < this.state.rows; row++) {
            const currentRow = [];
            for (let col = 0; col < this.state.cols; col++) {
                const currentNode = {
                    row,
                    col,
                    isStart: row === this.state.startNode.row && col === this.state.startNode.col,
                    isFinish: row === this.state.finishNode.row && col === this.state.finishNode.col,
                };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        this.setState({nodes});
    }

    render () {
        const {nodes} = this.state;

        return (
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
                                    isFinish={node.isFinish}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }
}
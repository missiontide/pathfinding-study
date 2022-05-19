import React from 'react';
import {NState} from '../PathfindingVisualizer'

import './Node.css'

export default class Node extends React.Component {
    render () {
        // set class based on Node's state
        let extraClassName;
        switch (this.props.state) {
            case NState.start:
                extraClassName = "node-start"; break;
            case NState.target:
                extraClassName = "node-target"; break;
            case NState.visited:
                extraClassName = "node-visited"; break;
            case NState.wall:
                extraClassName = "node-wall"; break;
            default:
                extraClassName = "";
        }

        const {row, col} = this.props;

        return (
            <div
                className={`node ${extraClassName}`}
                // onMouseDown={() => this.props.onMouseDown(row, col)}
                // onMouseEnter={() => this.props.onMouseEnter(row, col)}
                // onMouseUp={() => this.props.onMouseUp()}
            >
            </div>
        )
    }
}
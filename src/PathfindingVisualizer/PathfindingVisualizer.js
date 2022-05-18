import React from 'react';
import Node from "./Node/Node";

import './PathfindingVisualizer.css'


export default class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div>
                <Node />
            </div>
        )
    }
}
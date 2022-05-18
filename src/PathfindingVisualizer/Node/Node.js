import React from 'react';

import './Node.css'

export default class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div className="node">
                Node
            </div>
        )
    }
}
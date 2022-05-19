import React from 'react';

import './Node.css'

export default class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: this.props.row,
            col: this.props.col,
            isStart: this.props.isStart,
            isFinish: this.props.isFinish,
        };
    }

    render () {
        const {isStart, isFinish} = this.props;
        const extraClassName =
            isStart ? 'node-start'
            : isFinish ? 'node-finish'
            : '';

        return (
            <div
                className={`node ${extraClassName}`}
                key={this.key}>

            </div>
        )
    }
}
import React from 'react';

import './Node.css'

export default class Node extends React.Component {

    render () {
        const {isStart, isTarget, isVisited} = this.props;
        const extraClassName =
            isStart ? 'node-start'
            : isTarget ? 'node-target'
            : isVisited ? 'node-visited'
            : '';

        return (
            <div className={`node ${extraClassName}`}>

            </div>
        )
    }
}
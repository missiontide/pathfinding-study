import {NState} from '../PathfindingVisualizer/PathfindingVisualizer'

/**
 * Breadth First Search algorithm
 * @param nodesGrid 2d array of nodes, a node has .row, .col, .isStart, .isFinish, .isVisited
 * @param startNode the start node
 * @param targetNode the target node
 */
export default function BFS(nodesGrid, startNode, targetNode) {
    // initialize direction vectors
    // pairs of row,col transformations
    const dVectors = [[0, 1],[1, 0],[0, -1],[-1, 0]];
    const visitedNodesInOrder = [];

    // start BFS from startNode.
    // Enqueue it and mark it as visited (no need bc its state is start)
    let queue = [];
    queue.push(startNode);

    while (queue.length !== 0) {
        // dequeue node
        let currentNode = queue.shift();
        // console.log(`${currentNode.row}-${currentNode.col}`);

        // move to its adjacent nodes that are not visited
        for (let i = 0; i < dVectors.length; i++) {

            let adjRow = currentNode.row + dVectors[i][0];
            let adjCol = currentNode.col + dVectors[i][1];

            if (isValid(nodesGrid, adjRow, adjCol)) {
                let adjNode = nodesGrid[adjRow][adjCol];

                // targetNode found
                if (adjNode.state === NState.target)
                    return visitedNodesInOrder;

                // mark them visited and enqueue them into the queue
                adjNode.state = NState.visited;
                visitedNodesInOrder.push(adjNode);
                queue.push(adjNode);
            }
        }
    }

    return visitedNodesInOrder;
}

/**
 * Helper function to determine if a node is valid to be visited
 * A node is only valid if it is inbounds and has NOT been visited yet.
 * @param nodesGrid
 * @param row
 * @param col
 * @returns {boolean}
 */
function isValid(nodesGrid, row, col) {
    // if cell lies out of bounds
    if (row < 0 || col < 0 || row >= nodesGrid.length || col >= nodesGrid[0].length)
        return false;

    // if cell has NOT been visited, return true
    const state = nodesGrid[row][col].state;
    console.log(state);
    return state === NState.unvisited || state === NState.target;
}

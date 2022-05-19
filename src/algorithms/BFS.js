/**
 * Breadth First Search algorithm
 * @param nodes 2d array of nodes, a node has .row, .col, .isStart, .isFinish, .isVisited
 * @param startNode the start node
 * @param targetNode the target node
 */
export default function BFS(nodes, startNode, targetNode) {
    // initialize direction vectors
    // pairs of row,col transformations
    const dVectors = [[0, 1],[1, 0],[0, -1],[-1, 0]];
    const visitedNodesInOrder = [];

    // start BFS from startNode. Enqueue it and mark it as visited
    let queue = [];
    startNode.isVisited = true;
    queue.push(startNode);

    while (queue.length !== 0) {
        // dequeue node
        let currentNode = queue.shift();
        // console.log(`${currentNode.row}-${currentNode.col}`);

        // move to its adjacent nodes that are not visited
        for (let i = 0; i < dVectors.length; i++) {

            let adjRow = currentNode.row + dVectors[i][0];
            let adjCol = currentNode.col + dVectors[i][1];

            if (isValid(nodes, adjRow, adjCol)) {
                // console.log(` * ${i} checking: ${adjRow}-${adjCol}`);
                let adjNode = nodes[adjRow][adjCol];

                // targetNode found
                if (adjNode.isTarget)
                    return visitedNodesInOrder;

                // mark them visited and enqueue them into the queue
                adjNode.isVisited = true;
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
 * @param nodes
 * @param row
 * @param col
 * @returns {boolean}
 */
function isValid(nodes, row, col) {
    // if cell lies out of bounds
    if (row < 0 || col < 0 || row >= nodes.length || row >= nodes[0].length)
        return false;

    // if cell has NOT been visited, return true
    return !nodes[row][col].isVisited;
}
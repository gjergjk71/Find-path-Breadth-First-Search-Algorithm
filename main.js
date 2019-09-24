const EMPTY = 0;
const OBSTACLE = 1;
const EMPTY_AND_ALREADY_WALKED = 2;

const posCalc = (pos,x,y) => [ pos[0] + x, pos[1] + y]
const samePos = (pos1,pos2) => pos1[0] === pos2[0] && pos1[1] === pos2[1];
const isNotUndefined = (pos,grid) => {
    try {
        let item = grid[pos[0]][pos[1]]
        if (item === undefined) return false
        return true;
    } catch { return false }
}

const getWalkableMoves = (pos,grid) => {
    let moves = [
        posCalc(pos, 1, 0),
        posCalc(pos, -1, 0),
        posCalc(pos, 0, -1),
        posCalc(pos, 0, 1)
    ]
    moves = moves.filter(pos => isNotUndefined(pos,grid))
    return moves.filter(pos => [OBSTACLE, EMPTY_AND_ALREADY_WALKED].indexOf(grid[pos[0]][pos[1]]) === -1);
}

const findPath = (startPos,endPos,grid) => {
    let location = {
        pos: startPos,
        path: []
    }
    let queue = [location];
    while (queue.length){
        let currentLocation = queue.shift();
        let moves = getWalkableMoves(currentLocation.pos,grid);
        for (move of moves){
            grid[move[0]][move[1]] = EMPTY_AND_ALREADY_WALKED;
            if (samePos(endPos,move)){
                return currentLocation.path.concat([move])
            }
            let new_location = {
                pos: move,
                path: currentLocation.path.concat([move])
            }
            queue.push(new_location)
        }
    }
    return false;
}


var gridSize = 4;
var grid = [];
for (var i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (var j = 0; j < gridSize; j++) {
        grid[i][j] = EMPTY;
    }
}

grid[0][1] = OBSTACLE

console.log(grid);
let result = findPath([0,0],[0,3],grid);
console.log()
console.log(result)

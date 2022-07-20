import { WildcardBodyColor, WildcardGuideColor, NumWildcards } from "../Constants";

export function createFirstBoard(colors, height) {
    return Array(colors.length)
    .fill()
    .map((_, i) => Array(height).fill(colors[i]))
    .concat(Array(NumWildcards).fill()
            .map(() => Array(height - 1).fill(WildcardBodyColor).concat([WildcardGuideColor]))
    );
}

function notFirst(col, pos) {
    return pos !== 0 && col.some((entry, idx) => idx < pos && entry !== WildcardBodyColor);
}
function isFirst(col, pos) {
    return !notFirst(col, pos);
}

function canMoveToWildcard(board, srcCol, dstCol, pos) {
    const width = board.length - NumWildcards;
    if (dstCol < width) {
        // We don't operate on non-wildcards
        return true;
    }
    const height = board[0].length - 1;
    const colColor = board[dstCol].find((entry, idx) => idx < height && entry !== WildcardBodyColor);

    return !colColor || board[srcCol][pos] === colColor;
}

export function getRandomElement(arr) {
    return arr[Math.round(Math.random()*(arr.length - 1))];
}
export function scramble(board, iterations = 1000) {
    const height = board[0].length - 1;
    const records = [];
    for (let i = 0; i < iterations; i++) {
        // What can be moved?
        const options = [];
        board.forEach((col, colIdx) => 
            col.forEach(
                (_, idx) => idx < height && 
                            col[idx] !== WildcardBodyColor &&
                            isFirst(col, idx) && 
                            options.push([colIdx, idx]) // TODO: Nested predicate can be optimized to O(n)
            )
        );
        const optToMove = getRandomElement(options);
        const [x, y] = optToMove;
        const dstOptions = [];
        board.forEach((col, idx) => {
            const origColor = board[x][y];
            if (col[height] === origColor || x === idx) {
                // We skip this color to maximize entropy
                return;
            }
            if (col[y] === WildcardBodyColor && canMoveToWildcard(board, x, idx, y)) {
                dstOptions.push(idx);
            }
        });

        if (!dstOptions.length) {
            continue;
        }

        const newX = getRandomElement(dstOptions);
        board[newX][y] = board[x][y];
        board[x][y] = WildcardBodyColor;
        records.push([newX, x, y]);
    }

    return board;
}
export function checkWinner(board) {
    const width = board.length - NumWildcards;
    const height = board[0].length - 1;
    return board.every((col, idx) => idx >= width || col.every(entry => entry === col[height]));
}
export function moveColor(board, fromCol, toCol, pos) {
    if (fromCol === toCol) {
        return board;
    }

    const dstColor = board[toCol][pos];
    if (dstColor !== WildcardBodyColor) {
        return board;
    }

    if (notFirst(board[fromCol], pos)) {
        return board;
    }

    if (!canMoveToWildcard(board, fromCol, toCol, pos)) {
        return board;
    }
    
    const originalColor = board[fromCol][pos];
    if (originalColor === WildcardBodyColor) {
        return board;
    }

    return board.map((col, colIdx) => {
        if (colIdx === fromCol) {
            col[pos] = WildcardBodyColor;
        }
        if (colIdx === toCol) {
            col[pos] = originalColor;
        }
        return col;
    });
} 
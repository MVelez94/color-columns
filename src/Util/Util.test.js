import { checkWinner, createFirstBoard, moveColor, scramble } from ".";

const colors = ["A", "B", "C", "D", "E", "F"];
describe("Checks for win state", () => {
    const board = createFirstBoard(colors, 5);
    it("Should say the user won", () => {
        expect(checkWinner(board)).toBe(true); // board is initially on win state.
    })
    it("Should not say the user has won", () => {
        expect(checkWinner(scramble(board))).toBe(false);
    });
});

describe("Checks for first-of-column rule", () => {
    const board = createFirstBoard(colors, 5);
    it("Should forbid movements", () => {
        expect(moveColor(board, 0, colors.length, 1)).toBe(board); // That is; it didn't mutate the board 
        expect(moveColor(board, 0, colors.length, 0)).not.toBe(board); // For the first position of an ordered board, it should be always possible to move.
    })
});

describe("Checks for wildcards", () => {
    let board = createFirstBoard(colors, 5)
    board = moveColor(board, 0, colors.length, 0); // Move first column, first box
    board = moveColor(board, 1, colors.length + 1, 0); // Move second column, first box
    it("Should not allow for the movement", () => {
        expect(moveColor(board, 0, colors.length + 1, 1)).toBe(board); // First column, second box, moved to second wildcard
    });
    it("Should allow for the movement", () => {
        expect(moveColor(board, 0, colors.length, 1)).not.toBe(board); // First column, second box, moved to first wildcard
    });
    
});
import { useCallback, useEffect, useMemo, useState } from "react";
import { createFirstBoard, scramble, moveColor, checkWinner } from "../Util";
import Column from '../Column';
import Winner from "../Winner";
import { WildcardBodyColor } from "../Constants";
import './Game.css';

const colors = ["purple", "blue", "yellow", "green", "red"];
export default function Game({ hasWon, onGameWin }) {
    const firstBoard = useMemo(() => scramble(createFirstBoard(colors, 5)), []);
    const [board, setBoard] = useState(firstBoard);
    const [currentSelected, setCurrentSelected] = useState();

    const handleBoxClick = useCallback((column, pos) => {
        if (hasWon) {
            return;
        }
        const dstColor = board[column][pos];
        if (!currentSelected || currentSelected[0] === column) {
            dstColor !== WildcardBodyColor && setCurrentSelected([column, pos]);
        } else {
            const [origColumn, origPos] = currentSelected;
            if (origPos === pos) {
                const newBoard = moveColor(board, origColumn, column, origPos);
                board !== newBoard && setBoard(newBoard);
                board !== newBoard && setCurrentSelected();
                board === newBoard && dstColor !== WildcardBodyColor && setCurrentSelected([column, pos]);
            } else {
                dstColor !== WildcardBodyColor && setCurrentSelected([column, pos]);
            }
        }
    }, [setBoard, setCurrentSelected, currentSelected, board, hasWon]);

    useEffect(() => {
        if(!hasWon && checkWinner(board)) {
            onGameWin(true);
        }
    }, [board]);

    return <div className="game-wrapper">
        {hasWon && <Winner colors={colors} />}
        {board.map((col, i) => (<Column onBoxClick={(pos) => handleBoxClick(i, pos)} color={colors[i]} key={colors[i] ?? `wildcard-${i}`} contents={col} selected={currentSelected?.[0] === i ? currentSelected[1] : undefined} />))}
    </div>;
}
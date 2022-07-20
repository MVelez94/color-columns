import { getRandomElement } from "../Util";
import { WinnerMessage } from "../Constants";
import { memo, useEffect, useReducer } from "react";
import './Winner.css';
function renderChar(char, idx, colors) {
    const color = getRandomElement(colors);
    return <span key={idx} style={{ color: color }}>{char}</span>;
}
function Winner({ colors }) {
    const [fontSize, dispatch] = useReducer((s) => s + 1, 0);

    useEffect(() => {
        const int = setInterval(() => dispatch(), 100);
        return () => clearInterval(int);
    }, []);

    return <div className="winner-message">
        <strong style={{ fontSize: fontSize > 32 ? 32 : fontSize }}>{WinnerMessage.split("").map((c, idx) => renderChar(c, idx, colors))}</strong>
    </div>
}

export default memo(Winner);
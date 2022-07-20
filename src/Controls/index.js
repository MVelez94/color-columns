import { useEffect, useRef, useState } from 'react';
import './Controls.css';

function formatTimeChunk(chunk) {
    return `${chunk >= 0 && chunk <= 9 ? "0" : ""}${chunk}`;
}
export default function Controls({ hasStarted, hasWon, onStart }) {
    const [timeSpent, setTimeSpent] = useState(0);
    const intRef = useRef();

    const clearTimer = () => intRef.current >= 0 && clearInterval(intRef.current);
    useEffect(() => {
        clearTimer();
        if (hasStarted) {
            intRef.current = setInterval(() => {
                setTimeSpent(spent => spent + 1);
            }, 1000);
        } else {
            setTimeSpent(0);
        }
        return clearTimer;
    }, [hasStarted, setTimeSpent]);

    useEffect(() => {
        if (hasWon) {
            clearTimer();
        }
    }, [hasWon])
    const secs = timeSpent % 60;
    const min = (timeSpent / 60) >>> 0;
    return <div className='control-panel'>
        <div>
            {hasStarted ? <div style={{ color: hasWon ? "red" : "black" }}><strong>Time spent:</strong>&nbsp;{formatTimeChunk(min)}:{formatTimeChunk(secs)}</div> : "You know the rules. Just click on a first-of-column box, and put it on an empty (blank) space ;)"}
            <button onClick={onStart}>{hasStarted ? "Restart" : "Start"}</button>
        </div>
    </div>;
}
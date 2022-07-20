import Box from '../Box';
import { WildcardBodyColor, WildcardGuideColor } from '../Constants';
export default function Column({ color, contents, selected, onBoxClick }) {
    return <div>
        {contents.map((c, i) => {
            const isLast = i === contents.length - 1;
            return (<Box color={isLast ? color ?? WildcardGuideColor : c || WildcardBodyColor} onClick={isLast ? undefined : () => onBoxClick(i)} key={`box-${i}`} selected={selected === i} />)
        })}
    </div>;
}
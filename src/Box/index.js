import './Box.css';
export default function Box({ color, onClick, selected }) {
    return <div onClick={onClick} style={{ backgroundColor: color, ...(selected && { border: "1px cyan solid" }) }} className="box">&nbsp;</div>;
}
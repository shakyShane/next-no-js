import React, {useState, useEffect} from "react";

export function Counter() {
    const [time, setTime] = useState(0);
    useEffect(() => {
        setInterval(() => {
            setTime(t => t+= 1);
        }, 1000)
    }, []);
    return (
        <span>count: {time}</span>
    )
}

export default Counter;
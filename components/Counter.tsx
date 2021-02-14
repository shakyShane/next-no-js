import React, { useState, useEffect } from "react";

export function Counter() {
    const [time, setTime] = useState(0);
    useEffect(() => {
        setInterval(() => {
            setTime((t) => (t += 1));
        }, 1000);
    }, []);
    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <span>
                    setInterval is not good for timers like this: <strong data-test-id="time">{time}</strong>
                </span>
            </div>
        </div>
    );
}

export default Counter;

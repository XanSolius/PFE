import { useState, useEffect } from "react";

function CurrentDate() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <p style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold", color: "white", marginTop: "80px" }}>
            {currentDate.toLocaleString()}
        </p>
    );
}

export default CurrentDate;

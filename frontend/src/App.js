import React, { useState } from "react";
import "./App.css";

const initialState = {
    day: "01",
    month: "02",
    year: "2022",
};

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const App = () => {
    const [dob, setDOB] = useState(initialState);
    const [age, setAge] = useState("18");
    const [show, setShow] = useState(false);

    const getAge = () => {

        var now = new Date();

        if(!((dob.day>0 && dob.day<32) && (dob.month>0 && dob.month<13) && (dob.year <= now.getFullYear()))) {
            setAge("Please enter valid date !");
            setShow(true);
            return;
        }

        if(dob.year === now.getFullYear()) {
            setAge("You are 0 years old !");
            setShow(true);
            return;
        }

        var bday = new Date(`${dob.year}-${dob.month}-${dob.day}`);

        var years = now.getFullYear() - bday.getFullYear();
        bday.setFullYear(bday.getFullYear() + years);

        if (bday > now) {
            years--;
            bday.setFullYear(bday.getFullYear() - 1);
        }

        var days = (now.getTime() - bday.getTime()) / (3600 * 24 * 1000);
        var age = Math.floor(years + days / (isLeapYear(now.getFullYear()) ? 366 : 365));

        setAge(`You are ${age} years old.`);
        setShow(true);
    };

    const handleInputChange = (e) => {
        setDOB({
            ...dob,
            [e.target.name]: e.target.value,
        });
        setShow(false);
    };

    return (
        <div className="myage">
            <h1>Find Your Age</h1> <br />
            Day (dd): <input type="text" name="day" value={dob.day} onChange={handleInputChange} />
            <br />
            Month (mm):
            <input type="text" name="month" value={dob.month} onChange={handleInputChange} /> <br />
            Year (yyyy):
            <input type="text" name="year" value={dob.year} onChange={handleInputChange} /> <br />
            <button onClick={getAge}>Get Age</button>
            {show && <h3>{age}</h3>}
        </div>
    );
};

export default App;

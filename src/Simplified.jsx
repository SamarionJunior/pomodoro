import './App.css';

import React, { useEffect, useRef, useState } from 'react';

function Simplified() {

    const body = document.getElementById("trueRoot");

    const secondsMax = 59
    // const minutesMax = 59
    const secondsMin = 0
    // const minutesMin = 0
    const workMax = 5
    const restMax = 25

    const decrement = 1

    const milliseconds = 1000

    const initial = useRef({
        seconds: false,
        pause: false,
        rest: false
    });

    const [rest, setRest] = useState();

    const [myInterval, setMyInterval] = useState();

    const [minutes, setMinutes] = useState(restMax);
    const [seconds, setSeconds] = useState(secondsMin);

    const [pause, setPause] = useState(true);

    useEffect(() => {
        isFirstRun(initial, "seconds", timeFlowHandler)
    }, [seconds])

    useEffect(() => {
        isFirstRun(initial, "pause", timeFlowHandler)
    }, [pause])

    useEffect(() => {
        isFirstRun(initial, "rest", () => {
            console.log("Rest")
            if(rest){
                initialTime(secondsMin, workMax)
                toggle(body, "bg-danger", "bg-primary")
            } else {
                initialTime(secondsMin, restMax)
                toggle(body, "bg-primary", "bg-danger")
            }
        })
    }, [rest])

    const setManualRest = (value) => {
        startPause()
        setRest(value)
    }

    

    const isFirstRun = (ref, prop, callback) => {
        if(ref.current[prop]){
            callback()
        }
        ref.current[prop] = true
    }

    const timeFlowHandler = () => {
        pause ? clearInterval(myInterval) : loopInterval(milliseconds)
    }

    const initialTime = (seconds, minutes) => {
        setSeconds(seconds)
        setMinutes(minutes)
    }

    const startPause = () => {
        clearInterval(myInterval);
        setPause(true)
    }

    const reset = () => {
        startPause()
        rest ? initialTime(secondsMin, workMax) : initialTime(secondsMin, restMax)
        console.log("reset")
    }

    const countdown = () => {
        if(seconds === 0){
            if(minutes !== 0){
                initialTime(secondsMax, minutes - decrement)
            } else {
                initialTime(secondsMax, rest ? restMax : workMax)
                setRest(!rest)
            }
        } else {
            setSeconds(seconds - decrement)
        }
    }

    const restart = () => {
        clearInterval(myInterval);
        countdown();
    }

    const loopInterval = (milliseconds) => {
        setMyInterval(setTimeout(restart, milliseconds))
    }

    const toggle = (element, actual, replace) => {
        element.classList.remove(actual);
        element.classList.add(replace);
    }

    const formatNumber = (value) => {
        return value < 10 ? `0${value}` : value;
    }

    const timerMinutes = formatNumber(minutes)
    const timerSeconds = formatNumber(seconds)
  
    return (
        <div className="row g-5 justify-content-center align-items-center">
            <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 p-0">
                <div className="card text-center border border-0 pomodoro">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center shadow-sm">
                        <div className={`d-flex justify-content-center align-items-center border border-5 ${rest ? "border-primary" : "border-danger"} rounded-circle mb-3 shadow-sm`} style={{width: "200px", height: "200px"}}>
                            <p className={`${rest ? "text-primary" : "text-danger"} timer m-0 p-0`} style={{fontSize: "3rem"}}>
                                <strong>
                                    {timerMinutes}:{timerSeconds}
                                </strong>
                            </p>
                        </div>
                        <div className="d-flex justify-content-around" style={{width: "200px"}}>
                            
                            {!pause ? (
                                <button onClick={() => setPause(oldValue => !oldValue)} className={`btn ${rest ? "btn-primary" : "btn-danger"} shadow-sm`}>
                                    <i className="fa-solid fa-pause sizeI"></i>
                                </button>
                            ) : (
                                <button onClick={() => setPause(oldValue => !oldValue)} className={`btn ${rest ? "btn-primary" : "btn-danger"} shadow-sm`}>
                                    <i className="fa-solid fa-play sizeI"></i>
                                </button>
                            )}
                            <button onClick={() => reset()} className={`btn ${rest ? "btn-primary" : "btn-danger"} shadow-sm`}>
                                <i className="fa-solid fa-arrow-rotate-left sizeI"></i>
                            </button>
                            {rest ? (
                                <button onClick={() => setManualRest(!rest)} className={`btn ${rest ? "btn-primary" : "btn-danger"} shadow-sm`}>
                                    <i className="fa-solid fa-briefcase sizeI"></i>
                                </button>
                            ) : (
                                <button onClick={() => setManualRest(!rest)} className={`btn ${rest ? "btn-primary" : "btn-danger"} shadow-sm`}>
                                    <i className="fa-solid fa-moon sizeI"></i>
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Simplified;
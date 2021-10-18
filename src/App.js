import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import { Observable } from "rxjs";
import "./App.css";

let val = 52;
const msec = new Observable((subscriber) => {
  const intervalId = setInterval(() => {
    val += 1;
    subscriber.next(val);
    if (val === 59) {
      val = -1;
    }
  }, 400);
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});

function App() {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);
  const [started, setStarted] = useState(false);
  const secSubscription = useRef(null);
  const start = () => {
    if (started) {
      stop();
    } else {
      secSubscription.current = msec.subscribe((x) => {
        console.log(x);
        setSec(x);
      });
      setStarted(true);
    }
  };
  useEffect(() => {
    if (sec >= 59) {
      setMin((min1) => {
        return min1 >= 59 ? 0 : min1 + 1;
      });
    }
  }, [sec]);

  useEffect(() => {
    if (min >= 59) {
      setHour((hour1) => {
        console.log(hour1);
        return hour1 >= 59 ? 0 : hour1 + 1;
      });
    }
  }, [min]);

  const stop = () => {
    val = 0;
    setSec(0);
    setMin(0);
    setHour(0);
    secSubscription.current.unsubscribe();
    setStarted(false);
  };

  const wait = () => {
    secSubscription.current?.unsubscribe();
    setStarted(false);
  };

  const [click, setClick] = useState(0);
  const delay = 300;
  useEffect(() => {
    const timer = setTimeout(() => {
      setClick(0);
    }, delay);
    if (click === 2) {
      wait();
    }

    return () => clearTimeout(timer);
  }, [click]);

  const reset = () => {
    val = 0;
    setSec(0);
    setMin(0);
    setHour(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="100px" />
        <div className="timer">
          <h3> Timer </h3>
          <div className="display">{`${hour} : ${min} : ${sec}`}</div>
          <button onClick={start}> start/stop </button>
          <button onClick={() => setClick((prev) => prev + 1)}> wait </button>
          <button onClick={reset}> reset </button>
          {/* {hour} {min} {sec} */}
        </div>
      </header>
    </div>
  );
}

export default App;

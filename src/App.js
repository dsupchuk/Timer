import logo from './logo.svg';
import React, {useState, useEffect} from "react"
// import {interval} from "rxjs";
import { Observable } from 'rxjs';
// import {takeWhile, startWith, scan, repeat} from "rxjs/operators"
import './App.css';

// const observable$ = interval(1).pipe(
//   startWith(0),
//   scan(time => time+1),
//   takeWhile(time => time <= 60),
//   repeat()
// )


function App() {
  const [ms, msSet] = useState(0)
  let val = 0
  const foo = new Observable(subscriber => {
    
    subscriber.next(val+1);
    setInterval(() => {
      val+=1
      subscriber.next(val);
    }, 1000)
    
  
  });
  useEffect(() => {
    foo.subscribe(x => {
      console.log(x);
    });
    
  }, [foo])
  
  // const [sec, setSec] = useState();
  // const [min, setMin] = useState(0)
  // const [hour, setHour] = useState(0)

  

  // useEffect(() => {
  //   const sub = observable$.subscribe(setSec)

    
  //   return()=>sub.unsubscribe()
  // }, [])
  // useEffect(() => {

  //   if(sec>=60){
  //     setMin((min1)=>{
  //       return min1 >= 59 ? 0 : min1+1
  //     })

  //   }
  // }, [sec])
  // useEffect(() => {
  //   // setMin(min+sec%60)
  //   if(min>=60){
  //     setHour((hour1)=>{
  //       return hour1 >= 59 ? 0 : hour1+1
  //     })
  //   }
  // }, [min])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="100px"/>
        <div className="timer">
          <h3>Timer</h3>
          {/* <div className="display">{`${hour} : ${min} : ${sec}`}</div> */}
          {/* <button onClick={}>start</button> */}

        </div>
      </header>
      
    </div>
  );
}

export default App;

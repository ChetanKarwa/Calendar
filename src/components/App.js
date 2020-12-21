import React, {Component, useState} from "react";
import '../styles/App.css';
import moment from 'moment';

export default function App() {
  let[selectedDate,setSelectedDate] = useState(moment());
  let[showYearInput,setShowYearInput] = useState(true);
  const daysInMonth = () => selectedDate.daysInMonth();
  const selectedCurrentDate = () => selectedDate.get("date");
  const gapsToBeLeft = () => moment(selectedDate).startOf('month').format('d');

  let completeTable = [];
  let oneRow = [];
  let totalCells = [];

  for(let i = 0;i<gapsToBeLeft() ; i++)
    totalCells.push(<td className = "border border-secondary" key={(i+1)*101}>{""}</td>);

  for(let i = 1;i<=daysInMonth(); i++)
  {
    if(i===selectedCurrentDate())
    totalCells.push(<td className = "border border-secondary bg-info" key = {(i)*103}>{i}</td>);
    else
    totalCells.push(<td className = "border border-secondary" key = {(i)*103}>{i}</td>);
  }

  for(let i = Number(gapsToBeLeft())+Number(daysInMonth());i%7!==0;i++)
    totalCells.push(<td className = "border border-secondary" key={(i+1)*100}>{""}</td>);

  totalCells.forEach((cell, i)=>{
    if(i%7 !== 0)
    {
      oneRow.push(cell);
    }
    else
    {
      let currRow = oneRow.slice();
      completeTable.push(<tr className = "border border-secondary"key = {i*109+2}>{currRow}</tr>);
      oneRow = [];
      oneRow.push(cell);
    }
    if(i === totalCells.length - 1)
    {
      let currRow = oneRow.slice();
      completeTable.push(<tr key = {i*109+2}>{currRow}</tr>);
    }
  })

  const alterYear = (year) => {
    let dateContext = Object.assign({}, selectedDate);
    dateContext = moment(dateContext).set("year",year);
    setSelectedDate(dateContext);
  }

  const setMonth = (month) => {
        let dateContext = Object.assign({}, selectedDate);
        dateContext = moment(dateContext).set("month", month);
        setSelectedDate(dateContext);
      }

  return (
    <div id="main">
    <div className = "container">
    <div className = "mx-auto">
      <h1>Calendar</h1>
    <div className = "d-flex justify-content-around">
      <select value = {selectedDate.format("MMMM")} onChange={(e)=> {setMonth(moment.months().indexOf(e.target.value))}}>
        {
          moment.months().map((data)=>{
            return(
              <option  key={data} >
                  {data}
              </option >
            )
          })
        }
      </select >
      {
        showYearInput ?
        <span onDoubleClick={(e)=>setShowYearInput(false)}>  
        {selectedDate.format("Y")}          
        </span>
        :
        <input defaultValue = {selectedDate.format("Y")}
          onKeyUp = {(e)=>{
            if(e.which===13) 
            {setShowYearInput(true)}
          }}
          onChange = {(e)=>alterYear(e.target.value)}
        >
        </input>
      }
    </div>
    <hr className = "w-75">
    </hr>
    <table className="mx-auto w-75">
      <tbody >
        <tr className="bg-dark text-light">
          {moment.weekdaysShort().map((day)=>{
            return (
              <td className = "border border-secondary" key={day}>{day}</td>
            )
          })}
        </tr>
        {completeTable}
      </tbody>
    </table>
    <hr className = "w-75"></hr>
    <div className = "w-75 mx-auto">
      <button className = "w-25" onClick = {() => alterYear(Number(selectedDate.format("Y"))-1)}>{"<<"}</button>
      <button className = "w-25" onClick = {() => setMonth(Number(selectedDate.format("M"))-2)}>{"<"}</button>
      <button className = "w-25" onClick = {() => setMonth(Number(selectedDate.format("M")))}>{">"}</button>
      <button className = "w-25" onClick = {() => alterYear(Number(selectedDate.format("Y"))+1)}>{">>"}</button>
    </div>
    </div>
  </div>
  </div>
    )
}

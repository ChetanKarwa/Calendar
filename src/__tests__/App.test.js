import React from 'react'
import { render, fireEvent, act, screen, cleanup } from '@testing-library/react'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import App from '../components/App';
import moment from 'moment';
afterEach(cleanup);
let selectedDate = moment();

describe('Rendering Test', () => {
  it('Calendar heading exists', () => {
    const screen = mount(<App />);
    const heading = screen.find("#heading");
        
    expect(heading).not.toBeNull();
    expect(heading.text()).toEqual('Calendar');
  })

  it('Rendering correct year and Month in respective tags',()=>{
    const screen = mount(<App />);
    const month = screen.find("#month");
    const year = screen.find("#year");

    expect(month.props().value).toEqual(selectedDate.format("MMMM"));
    expect(year.text()).toEqual(selectedDate.format("Y"))
  })

  it('Rendering correct table',()=>{
    const screen = mount(<App />);
    let cellNumber = 1;
    let gapsToBeLeft =  moment(selectedDate).startOf('month').format('d');
    let daysInMonth = selectedDate.daysInMonth();
    for(let i = 0;i<gapsToBeLeft ; i++)
    {
      const id = "#cell" + cellNumber;
      const cell = screen.find(id);
      expect(cell.text()).toEqual("");
      cellNumber++;
    }
    for(let i = 1;i<=daysInMonth ; i++)
    {
      let id = "";
      if(i===selectedDate.get("date"))
      id = "#today";
      else
      id = "#cell" + cellNumber;
      const cell = screen.find(id);
      expect(cell.text()).toEqual(""+i);
      cellNumber++;
    }
    for(let i = Number(daysInMonth)+Number(gapsToBeLeft);i%7!==0 ; i++)
    {
      const id = "#cell" + cellNumber;
      const cell = screen.find(id);
      expect(cell.text()).toEqual("");
      cellNumber++;
    }
  })
})
describe('Event Firing Tests',() => {
    it("Testing year Change to year 2050", () => {
      
    act(() => {
        render(<App />)
    })

    let year = document.getElementById('year')
    act(() => {
        const rightClick = { year: 1 }
        fireEvent.dblClick(year, rightClick)
    })

    let yearTextBox = document.getElementById('yeartextbox')
    act(()=>{
      fireEvent.change(yearTextBox,{target: {value : "2050"}});
    })
    act(() => {
      fireEvent.keyUp(yearTextBox, { key: "Enter", code: 'Enter', keyCode: 13});
    })

    selectedDate = moment(selectedDate).set("year",2050);
    let cellNumber = 1;
    let gapsToBeLeft =  moment(selectedDate).startOf('month').format('d');
    let daysInMonth = selectedDate.daysInMonth();
    for(let i = 0;i<gapsToBeLeft ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
    for(let i = 1;i<=daysInMonth ; i++)
    { 
      let id = "";
      if(i===selectedDate.get("date"))
      id = "today";
      else
      id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual(""+i);
      cellNumber++;
    }
    for(let i = Number(daysInMonth)+Number(gapsToBeLeft);i%7!==0 ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
  })


  it("Testing month change to January", () => {
      
    act(() => {
        render(<App />)
    })

    let month = document.getElementById('month')
    act(()=>{
      fireEvent.change(month,{target: {value : "January"}});
    })
    selectedDate = moment();
    selectedDate = moment(selectedDate).set("month","January");
    let cellNumber = 1;
    let gapsToBeLeft =  moment(selectedDate).startOf('month').format('d');
    let daysInMonth = selectedDate.daysInMonth();
    for(let i = 0;i<gapsToBeLeft ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
    for(let i = 1;i<=daysInMonth ; i++)
    { 
      let id = "";
      if(i===selectedDate.get("date"))
      id = "today";
      else
      id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual(""+i);
      cellNumber++;
    }
    for(let i = Number(daysInMonth)+Number(gapsToBeLeft);i%7!==0 ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
  })

  it("Testing previous month Button", () => {
      
    act(() => {
        render(<App />)
    })

    let previousMonth = document.getElementById('previousMonth')
    act(() => {
      const rightClick = { previousMonth: 1 }
      fireEvent.click(previousMonth, rightClick)
  })
    selectedDate = moment();
    let month = selectedDate.format('M')-2;
    selectedDate = moment(selectedDate).set("month",month);
    let cellNumber = 1;
    let gapsToBeLeft =  moment(selectedDate).startOf('month').format('d');
    let daysInMonth = selectedDate.daysInMonth();
    for(let i = 0;i<gapsToBeLeft ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
    for(let i = 1;i<=daysInMonth ; i++)
    { 
      let id = "";
      if(i===selectedDate.get("date"))
      id = "today";
      else
      id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual(""+i);
      cellNumber++;
    }
    for(let i = Number(daysInMonth)+Number(gapsToBeLeft);i%7!==0 ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
  })

  it("Testing next month Button", () => {
      
    act(() => {
        render(<App />)
    })

    let nextMonth = document.getElementById('nextMonth')
    act(() => {
      const rightClick = { nextMonth: 1 }
      fireEvent.click(nextMonth, rightClick)
  })
    selectedDate = moment();
    let month = selectedDate.format('M');
    selectedDate = moment(selectedDate).set("month",month);
    let cellNumber = 1;
    let gapsToBeLeft =  moment(selectedDate).startOf('month').format('d');
    let daysInMonth = selectedDate.daysInMonth();
    for(let i = 0;i<gapsToBeLeft ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
    for(let i = 1;i<=daysInMonth ; i++)
    { 
      let id = "";
      if(i===selectedDate.get("date"))
      id = "today";
      else
      id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual(""+i);
      cellNumber++;
    }
    for(let i = Number(daysInMonth)+Number(gapsToBeLeft);i%7!==0 ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
  })

  it("Testing next year Button", () => {
      
    act(() => {
        render(<App />)
    })

    let nextYear = document.getElementById('nextYear')
    act(() => {
      const rightClick = { nextYear: 1 }
      fireEvent.click(nextYear, rightClick)
  })
    selectedDate = moment();
    selectedDate = moment(selectedDate).set("year",2021);
    let cellNumber = 1;
    let gapsToBeLeft =  moment(selectedDate).startOf('month').format('d');
    let daysInMonth = selectedDate.daysInMonth();
    for(let i = 0;i<gapsToBeLeft ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
    for(let i = 1;i<=daysInMonth ; i++)
    { 
      let id = "";
      if(i===selectedDate.get("date"))
      id = "today";
      else
      id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual(""+i);
      cellNumber++;
    }
    for(let i = Number(daysInMonth)+Number(gapsToBeLeft);i%7!==0 ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
  })
  it("Testing previous year Button", () => {
      
    act(() => {
        render(<App />)
    })

    let previousYear = document.getElementById('previousYear')
    act(() => {
      const rightClick = { previousYear: 1 }
      fireEvent.click(previousYear, rightClick)
  })
    selectedDate = moment();
    selectedDate = moment(selectedDate).set("year",2019);
    let cellNumber = 1;
    let gapsToBeLeft =  moment(selectedDate).startOf('month').format('d');
    let daysInMonth = selectedDate.daysInMonth();
    for(let i = 0;i<gapsToBeLeft ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
    for(let i = 1;i<=daysInMonth ; i++)
    { 
      let id = "";
      if(i===selectedDate.get("date"))
      id = "today";
      else
      id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual(""+i);
      cellNumber++;
    }
    for(let i = Number(daysInMonth)+Number(gapsToBeLeft);i%7!==0 ; i++)
    {
      const id = "cell" + cellNumber;
      const cell = document.getElementById(id);
      expect(cell.textContent).toEqual("");
      cellNumber++;
    }
  })
})



























/*
Everything is rendered properly :
  table with first row sun to sat
  table with all needed cells for current month and year
  a drop down to change month 
  a test to show year and double clicked it should cover to input text box to take text input
Event Firing:
  -when double clicked on year text, input text box should appear
  -after pressing enter key the input text box should be hidden and agian text of new year should show up and all the cells should change accordingly
  -when clicked on drop down 12 options should appear that should be 12 months
  -when any option is pressed the month should change and accordingly the table
*/
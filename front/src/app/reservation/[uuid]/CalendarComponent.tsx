"use client";

import React from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import './calendarDesign.css'
import { useState } from 'react';


function App() {

  const [date, setDate] = useState(new Date());

  const minDate = new Date();
  minDate.setDate(minDate.getDate());

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate()+14);

  return (
    <div>
      <Calendar
        minDate={minDate}
        maxDate={maxDate}
        onChange={setDate}
        value={date}
        next2Label={null}
        prev2Label={null}
        view="month"
        formatDay={(locale, date) => 
          date.toLocaleDateString(locale, {day: 'numeric'})}
        formatMonthYear={(locale, date) =>
          date.toLocaleDateString(locale, 
            { year: 'numeric', 
              month: '2-digit' }  
          )
        }
      />
      <p>selected: {date.toDateString()}</p>
    </div>
  )
}

export default App;
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import Select from './components/Select.Component';
import {getAllDatesOfMonth} from './util';
import DateGrid from './components/DateGrid.Component';
import * as actions from './store/actions/actions';
import CreateAppointmentForm from './components/CreateAppointmentFrom.Component';

const App = (props) => {
  const {appointments,dates,addDate,UILayer,updateDates} = props;
  const [currentYear,setCurrentYear] = useState(2021);
  const [currentMonth,setCurrentMonth] = useState(7);
  const [appointmentsForCurrentMonth,setAppointmentsForCurrentMonth] = useState({});

  const dateForAppointmentKey = moment(`${currentMonth}/${currentYear}}`,"MM/YYYY").format('MM-YYYY');

  useEffect(() => {
    const dates = getAllDatesOfMonth(currentYear,currentMonth);
    addDate(dates);
  },[])

  useEffect(() => {
    console.log(props);
  },[dates])

  useEffect(() => {
    if(Object.keys(appointments).length === 0) return;
    setAppointmentsForCurrentMonth(appointments[dateForAppointmentKey]);
  }, [appointments,currentYear,currentMonth])

  const handleYearChange = (e) => {
    setCurrentYear(e.target.value);
    updateDates(getAllDatesOfMonth(e.target.value,currentMonth));
  }

  const handleMonthChange = (e) => {
    setCurrentMonth(e.target.value);
    updateDates(getAllDatesOfMonth(currentYear,e.target.value));
  }

  return (
    <div>
      <CreateAppointmentForm/>
      <br/>
      <Select 
        list={UILayer.months}
        value={currentMonth}
        changeHandler={handleMonthChange}
      />
      <Select 
        list={UILayer.years}
        value={currentYear}
        changeHandler={handleYearChange}
      />
      <button>Create Appointment</button>
      <div style={{display:"flex",flexWrap:"wrap",gap: "5px"}}>
        {
          (dates || []).map(date => {
            return (
              <DateGrid 
                date={date}
                key={date}
                appointmentsForCurrentMonth={appointmentsForCurrentMonth}
              />
            )
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    appointments: state.appointments,
    dates: state.dates,
    UILayer: state.UILayer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addDate: (dates) => dispatch(actions.loadInitialDate(dates)),
    updateDates: (dates) => dispatch(actions.updateDates(dates))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

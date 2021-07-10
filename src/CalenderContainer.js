import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import {useParams} from 'react-router-dom';
import Select from './components/Select.Component';
import {getAllDatesOfMonth,loadState,saveState} from './utills';
import DateGrid from './components/DateGrid.Component';
import * as actions from './store/actions/actions';
import CreateAppointmentForm from './components/CreateAppointmentFrom.Component';
import Container from './components/helper/Container';
import {Button} from './components/Button';

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AppTopControlSection = styled(FlexContainer)`
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;

const AppTopControlFormElement = styled(FlexContainer)`
  justify-content: flex-start;
`;

const DateGridWrapper = styled(FlexContainer)`
  border-left: 1px solid ${props => props.theme.borderColor};
  border-top: 1px solid ${props => props.theme.borderColor};
  overflow: hidden;
`;

const App = (props) => {
  const {year,month} = useParams();
  const history = useHistory();
  const {appointments,dates,addDate,UILayer,updateDates,updateAppointmentsFromCache} = props;
  const [currentYear,setCurrentYear] = useState(year);
  const [currentMonth,setCurrentMonth] = useState(month);
  const [appointmentsForCurrentMonth,setAppointmentsForCurrentMonth] = useState({});
  const [isCreateAppointmentFormOpen,setIsCreateAppointmentFormOpen] = useState(false);

  const dateForAppointmentKey = moment(`${currentMonth}/${currentYear}}`,"MM/YYYY").format('MM-YYYY');

  useEffect(() => {
    const dates = getAllDatesOfMonth(currentYear,currentMonth);
    addDate(dates);
  },[])

  useEffect(() => {
    const cache = loadState();
    updateAppointmentsFromCache(cache);
  },[])

  useEffect(() => {
    // console.log(props);
  },[dates])

  useEffect(() => {
    if(Object.keys(appointments).length === 0) return;
    setAppointmentsForCurrentMonth(appointments[dateForAppointmentKey]);
    saveState(appointments);
  }, [appointments,currentYear,currentMonth])

  const handleYearChange = (e) => {
    setCurrentYear(e.target.value);
    updateDates(getAllDatesOfMonth(e.target.value,currentMonth));
    history.push(`/year/${e.target.value}/month/${currentMonth}`);
  }

  const handleMonthChange = (e) => {
    setCurrentMonth(e.target.value);
    updateDates(getAllDatesOfMonth(currentYear,e.target.value));
    history.push(`/year/${currentYear}/month/${e.target.value}`);
  }

  return (
    <Container>
        {isCreateAppointmentFormOpen && 
          <CreateAppointmentForm 
            setIsCreateAppointmentFormOpen={setIsCreateAppointmentFormOpen}
            isCreateAppointmentFormOpen={isCreateAppointmentFormOpen}
          />
        }
        <br/>
        <AppTopControlSection>
          <AppTopControlFormElement>
            <Select 
              list={UILayer.months}
              value={currentMonth}
              changeHandler={handleMonthChange}
              label="Select Month"
            />
            <Select 
              list={UILayer.years}
              value={currentYear}
              changeHandler={handleYearChange}
              label="Select Year"
            />
          </AppTopControlFormElement>
          <Button onClick={e => setIsCreateAppointmentFormOpen(true)}>Create Appointment</Button>
        </AppTopControlSection>
        <DateGridWrapper>
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
        </DateGridWrapper>
    </Container>
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
    updateDates: (dates) => dispatch(actions.updateDates(dates)),
    updateAppointmentsFromCache: (appointments) => dispatch(actions.loadFromCache(appointments))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

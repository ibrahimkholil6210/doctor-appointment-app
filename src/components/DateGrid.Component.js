import {useState,useEffect} from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {compare} from '../utills';
import { typeScale } from '../utills';
import AppointMentDetails from './AppointmentDetails.Compoent';

const DateBox = styled.div`
    height: calc(100vh / 4);
    width: calc(100% / 4);
    overflow: auto;
    border-right: 1px solid ${props => props.theme.borderColor};
    border-bottom: 1px solid ${props => props.theme.borderColor};
    box-sizing: border-box;
    padding: 12px 10px; 
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    align-content: baseline;
`;

const DateLabel = styled.label`
    padding: 6px 10px; 
    background-color: ${props => props.theme.primaryColor};
    border-radius: 8px;
    font-size: ${typeScale.helperText};
    color: ${props => props.theme.textColorOnPrimary};
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: 15px;
`;

const AppointmentListOnSingleDate = styled.ul`
    padding: 0;
    margin: 0 0 0 0;
    list-style: none;
    width: 100%;
`;

const SingleAppointmentList = styled.li`
    margin: 0 0 5px 0;
    cursor: pointer;
    font-size: ${typeScale.helperText};
    background: ${props => props.theme.primaryHoverColor};
    border-radius: 4px;
    color: ${props => props.theme.textColorInverted};
    padding: 5px 3px;
`;

const DateGrid = (props) => {
    const [appointmentForToday,setAppointmentForToday] = useState([]);
    const {date,appointmentsForCurrentMonth} = props;
    const [appointmentDetails,setAppointmentDetails] = useState({});
    const [isDetailsModalOpen,setIsDetailsModalOpen] = useState(false);

    useEffect(() => {
        if(appointmentsForCurrentMonth === undefined) return;
        const formatedDate = moment(date,'DD-MM-YYYY').format('DD-MM-YYYY');
        setAppointmentForToday(appointmentsForCurrentMonth[formatedDate]?.sort(compare));
    },[appointmentsForCurrentMonth,appointmentForToday]);

    // useEffect(() => {
    //     console.log({
    //         appointmentForToday,
    //         appointmentsForCurrentMonth
    //     })
    //     // if(appointmentForToday === undefined) return;
    //     // console.log("Sorted array",appointmentForToday.sort(compare));
    //     // setAppointmentForToday(appointmentForToday.sort(compare));
    // },[appointmentForToday])

    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }
    
    const handleDetailsClick = (data) => {
        setAppointmentDetails(data);
        setIsDetailsModalOpen(true);
    }
    
    return(
        <>
            {
                isDetailsModalOpen &&
                <AppointMentDetails
                    appointmentDetails={appointmentDetails}
                    setAppointmentDetails={setAppointmentDetails}
                    isDetailsModalOpen={isDetailsModalOpen}
                    setIsDetailsModalOpen={setIsDetailsModalOpen}
                />
            }
            <DateBox>
                <DateLabel>{date}</DateLabel>
                <AppointmentListOnSingleDate>
                    {(appointmentForToday || []).map((appointment,index) => {
                        return(
                            <SingleAppointmentList 
                                key={generateKey(`${appointment.formatedDate}${index}`)}
                                onClick={e => handleDetailsClick(appointment)}
                            >
                                Appointment by: {appointment.name}
                            </SingleAppointmentList>
                        )
                    })}
                </AppointmentListOnSingleDate>
            </DateBox>
        </>
    )
}

export default DateGrid;
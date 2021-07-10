import {useState,useEffect} from 'react';
import moment from 'moment';

const DateGrid = (props) => {
    const [appointmentForToday,setAppointmentForToday] = useState([]);
    const {date,appointmentsForCurrentMonth} = props;

    useEffect(() => {
        const formatedDate = moment(date,'DD-MM-YYYY').format('DD-MM-YYYY');
        console.log(appointmentsForCurrentMonth[formatedDate],formatedDate)
        setAppointmentForToday(appointmentsForCurrentMonth[formatedDate]);
    },[appointmentsForCurrentMonth,appointmentForToday]);

    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }
    
    
    return(
        <div style={{height: "calc(100vh / 2)",width: "calc(100vw / 4 - 8px)"}}>
            {date}
            <ul>
                {(appointmentForToday || []).map((appointment,index) => {
                    return(
                        <li key={generateKey(`${appointment.formatedDate}${index}`)}>Appointment by: {appointment.name}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default DateGrid;
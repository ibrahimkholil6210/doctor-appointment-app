import {useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import Select from './Select.Component';
import * as actions from '../store/actions/actions';

const CreateAppointmentForm = (props) => {
    // console.log("CREATE",props);
    const {createAppointments} = props;
    const [name,setName] = useState('IL');
    const [gender,setGender] = useState('Female');
    const [age,setAge] = useState('18');
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');

    const handleFormSubmit = () => {
        if(!name || !gender || !age || !date || !time) return alert('Empty Field!');
        const formatedDate = moment(date).format('DD-MM-YYYY');
        const dateForAppointmentKey = moment(date).format('MM-YYYY')
        // console.log({
        //     name,
        //     gender,
        //     age,
        //     time,
        //     formatedDate,
        //     dateForAppointmentKey
        // });
        createAppointments({
            name,
            gender,
            age,
            time,
            formatedDate,
            dateForAppointmentKey
        })
    }
    
    return(
        <>
            <h1>Create Appointment Form</h1>
            <input 
                type="text" 
                value={name} 
                placeholder="Enter Name" 
                onChange={e=>setName(e.target.value)}
            />
            <Select 
                list={['Male','Female']}
                value={gender}
                changeHandler={(e) => setGender(e.target.value)}
            />
            <input 
                value={age} 
                placeholder="18" 
                type="number" 
                onChange={e=>setAge(e.target.value)}
            />
            <input 
                type="date" 
                min="2019-01-01" 
                max="2021-12-31"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <input 
                type="time" 
                min="09:00" 
                max="18:00"
                value={time}
                onChange={e => setTime(e.target.value)}
            />
            <button onClick={handleFormSubmit}>Submit</button>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return({
        createAppointments: (formInputs) => dispatch(actions.createAppointment(formInputs))
    })
}

export default connect(null,mapDispatchToProps)(CreateAppointmentForm);
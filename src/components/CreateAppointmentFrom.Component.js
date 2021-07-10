import {useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Select from './Select.Component';
import * as actions from '../store/actions/actions';
import Modal from './Modal';
import {Button} from './Button';
import {typeScale} from '../utills';

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const StyledInputElement = styled.input`
    width: 313px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.theme.borderColor};
    height: 52px;
    background-color: ${props => props.theme.formInputElementBackground};
    padding: 9px 6px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

const FormLabel = styled.label`
    font-size: ${typeScale.helperText};
`;

const ModalHeader = styled.h3`
    font-size: ${typeScale.header3};
    margin: 53px 0 16px 0;
`;

const ModalText = styled.p`
    font-size: ${typeScale.paragraph};
    max-width: 70%;
    margin: 0 0 16px 0;
`;


const CreateAppointmentForm = (props) => {
    // console.log("CREATE",props);
    const {createAppointments,isCreateAppointmentFormOpen,setIsCreateAppointmentFormOpen} = props;
    const [name,setName] = useState('');
    const [gender,setGender] = useState('Female');
    const [age,setAge] = useState('');
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');

    const handleFormSubmit = () => {
        if(!name || !gender || !age || !date || !time) return alert('Empty Field!');
        const formatedDate = moment(date).format('DD-MM-YYYY');
        const dateForAppointmentKey = moment(date).format('MM-YYYY');
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
        });
        setIsCreateAppointmentFormOpen(false);
        setName('');
        setAge('');
        setGender('Female');
        setDate('');
        setTime('')
    }
    
    return(
        <Modal showModal={isCreateAppointmentFormOpen} setShowModal={setIsCreateAppointmentFormOpen}>          
            <ModalHeader>Create Appointment!</ModalHeader>
            <ModalText>Track your appointment history at one place!</ModalText>
            <FormWrapper>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <StyledInputElement 
                        type="text" 
                        value={name} 
                        placeholder="Enter Name" 
                        onChange={e=>setName(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Age</FormLabel>
                    <StyledInputElement 
                        value={age} 
                        placeholder="18" 
                        type="number" 
                        onChange={e=>setAge(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Date</FormLabel>
                    <StyledInputElement 
                        type="date" 
                        min="2019-01-01" 
                        max="2021-12-31"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Time</FormLabel>
                    <StyledInputElement 
                        type="time" 
                        min="09:00" 
                        max="18:00"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        required
                    />
                </FormGroup>
                <Select 
                    list={['Male','Female']}
                    value={gender}
                    changeHandler={(e) => setGender(e.target.value)}
                    label="Select Gender"
                />
            </FormWrapper>
            <Button onClick={handleFormSubmit}>Submit</Button>
            
        </Modal>
    )
}

const mapDispatchToProps = dispatch => {
    return({
        createAppointments: (formInputs) => dispatch(actions.createAppointment(formInputs))
    })
}

export default connect(null,mapDispatchToProps)(CreateAppointmentForm);
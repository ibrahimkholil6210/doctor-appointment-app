import {useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import styled from 'styled-components';
import * as actions from '../store/actions/actions';
import Modal from './Modal';
import {Button} from './Button';
import {typeScale} from '../utills';
import { useForm } from "react-hook-form";

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

const FlexWrapperSelect = styled.div`
    display: flex;
    font-size: ${typeScale.helperText};
    align-items: center;
    margin-right: 15px;
`;

const SelectDropDown = styled.select`
  width: 150px;
  height: 35px;
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.textColorInverted};
  font-size: 14px;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 10px 5px;
  }
  &:active{
        border: none;
        outline: none;
    }
`;


const CreateAppointmentForm = (props) => {
    const {createAppointments,isCreateAppointmentFormOpen,setIsCreateAppointmentFormOpen} = props;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFormSubmit = (data) => {
        const {
            name,
            gender,
            age,
            time,
            date
        } = data;
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
                        placeholder="Enter Name" 
                        {...register('name', { required: true, maxLength: 30 })} 
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Age</FormLabel>
                    <StyledInputElement 
                        placeholder="18" 
                        type="number" 
                        {...register('age', { required: true})} 
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Date</FormLabel>
                    <StyledInputElement 
                        type="date" 
                        min="2019-01-01" 
                        max="2021-12-31"
                        {...register('date', { required: true})}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Time</FormLabel>
                    <StyledInputElement 
                        type="time" 
                        min="09:00" 
                        max="18:00"
                        {...register('time', { required: true})}
                    />
                </FormGroup>
                <FlexWrapperSelect>
                    <FormLabel>Select Gender</FormLabel>
                    <SelectDropDown {...register('gender')}>
                        {['Male','Female'].map((value) => (
                            <option value={value} key={value}>{value}</option>
                        ))}
                    </SelectDropDown>
                </FlexWrapperSelect>
            </FormWrapper>
            <Button onClick={handleSubmit(handleFormSubmit)}>Submit</Button>
            
        </Modal>
    )
}

const mapDispatchToProps = dispatch => {
    return({
        createAppointments: (formInputs) => dispatch(actions.createAppointment(formInputs))
    })
}

export default connect(null,mapDispatchToProps)(CreateAppointmentForm);
import styled from 'styled-components';
import moment from 'moment';
import Modal from './Modal';
import {typeScale} from '../utills';

const ModalHeader = styled.h3`
    font-size: ${typeScale.header3};
    margin: 53px 0 16px 0;
`;

const ModalText = styled.p`
    font-size: ${typeScale.paragraph};
    max-width: 70%;
    margin: 0 0 16px 0;
`;


const AppointMentDetails = (props) => {
    const {setAppointmentDetails,appointmentDetails,setIsDetailsModalOpen,isDetailsModalOpen} = props;
    const {name,age,gender,formatedDate,time} = appointmentDetails;
    return(
        <Modal showModal={isDetailsModalOpen} setShowModal={setIsDetailsModalOpen}>          
            <ModalHeader>Appointment Detaials!</ModalHeader>
            <ModalText>Here are the details about the Appointment!</ModalText>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Gender: {gender}</p>
            <p>Date: {formatedDate}</p>
            <p>Time: {moment(time,"hh:mm").format("LT")}</p>
        </Modal>
    )
}

export default AppointMentDetails;
import React from 'react';
import styled from "styled-components";
import {typeScale} from '../utills';
import {Illustrations,CloseIcon} from '../assets';

const BackDrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex; 
    justify-content: center;
    align-items: center;
`;

const ModalWrapper = styled.div`
    width: 800px;
    height: 580px;
    box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.2);
    background-color: ${props => props.theme.formElementBackground};
    color: ${props => props.theme.textOnFormElementBackground};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 8px;
    background: ${props => props.theme.formElementBackground};
    padding: 55px 46px;
    z-index: 999;
`;

const CloseButtonWrapper = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    position: absolute;
    top: 40px;
    right: 40px;
    width: 24px;
    height: 24px;
    padding: 0;
`;

const ModalLeftContent = styled.div`
    width: 60%;
`;

const ModalRightContent = styled.div`
    width: 40%;
`;

const Modal = (props) => {
    const {showModal,setShowModal} = props;
    return (
        <BackDrop>
            <ModalWrapper>
                <ModalLeftContent>
                    {props.children}
                </ModalLeftContent>
                <ModalRightContent>
                    <img src={Illustrations.Createnew} alt="Create New Account!" aria-hidden="true"/>
                </ModalRightContent>
                <CloseButtonWrapper aria-label="Close Modal" onClick={() => setShowModal(false)}>
                    <CloseIcon/>
                </CloseButtonWrapper>
            </ModalWrapper>
        </BackDrop>
    )
}

export default Modal;
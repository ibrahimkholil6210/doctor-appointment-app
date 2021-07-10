import styled from "styled-components";
import {typeScale} from '../utills';

export const Button = styled.button`
    padding: 12px 24px;
    font-size: ${typeScale.paragraph};
    cursor: pointer;
    min-width: 100px;
    border-radius: 8px;
    border: none;
    transition: background-color .3s linear, color .3s linear;
    background-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.textColorOnPrimary};
    display: flex;
    align-items: center;
    &:hover{
        background-color: ${props => props.theme.primaryHoverColor};
        color: ${props => props.theme.textColorOnPrimary};
    }
    &:focus{
        outline: 3px solid ${props => props.theme.primaryActiveColor};
        outline-offset: 2px;
    }
    &:active{
        background-color: ${props => props.theme.primaryActiveColor};
        border-color: ${props => props.theme.primaryActiveColor};
        color: ${props => props.theme.textColorOnPrimary}
    }
`;

import * as actionTypes from './actionTypes';

export const loadInitialDate = (payload) => {
    return {
        type: actionTypes.LOAD_INIT_DATES,
        payload
    }
}

export const updateDates = (payload) => {
    return {
        type:  actionTypes.UPDATE_DATES,
        payload
    }
}

export const createAppointment = (payload) => {
    return{
        type: actionTypes.CREATE_APPOINTMENT,
        payload
    }
}
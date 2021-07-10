import * as actionTypes from '../actions/actionTypes';

const initialState = {
    appointments: {},
    dates: [],
    UILayer: {
        months: [1,2,3,4,5,6,7,8,9,10,11,12],
        years: [2019,2020,2021],
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOAD_INIT_DATES:
            return {
                ...state,
                dates: action.payload
            }
        case actionTypes.UPDATE_DATES:
            return {
                ...state,
                dates: action.payload
            }  
        case actionTypes.LOAD_FROM_CACHE:
            return{
                ...state,
                appointments: action.payload === undefined ? {} : action.payload,
            }
        case actionTypes.CREATE_APPOINTMENT:
            const {name,age,gender,time,formatedDate,dateForAppointmentKey} = action.payload;
            const appointment = {name,age,gender,formatedDate,time}
            const checkIfCurrentKeyExist = state.appointments[dateForAppointmentKey];
            if(checkIfCurrentKeyExist) {
               const checkIfCurrentDateExist =  checkIfCurrentKeyExist[formatedDate];
               if(checkIfCurrentDateExist) {
                return {
                    ...state,
                    appointments: {
                        ...state.appointments,
                        [dateForAppointmentKey]: {
                            ...state.appointments[dateForAppointmentKey],
                            [formatedDate]: [...checkIfCurrentDateExist,appointment]
                        }
                    }
                }
               }else{
                return {
                    ...state,
                    appointments: {
                        ...state.appointments,
                        [dateForAppointmentKey]: {
                            ...state.appointments[dateForAppointmentKey],
                            [formatedDate]: [appointment]
                        }
                    }
                }
               }
               
            }else{ 
                return {
                    ...state,
                    appointments: {
                        ...state.appointments,
                        [dateForAppointmentKey] : {
                            [formatedDate] : [appointment]
                        }
                    }
                } 
            }       
        default:
            return state;
    }
    
};

export default reducer;
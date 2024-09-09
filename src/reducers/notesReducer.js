import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.notesAddNew:
            console.log("Entro");
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }
    
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }  

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesLogoutCleaning:
            return {
                ...state,
                notes: [],
                active: null
            }

        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map( note => 
                    note.id === action.payload.id 
                        ? action.payload.note
                        : note
                )
            } 

        case types.notesDelete:
            return {
                ...state,
                notes: state.notes.filter( note => note.id !== action.payload ),
                active: null
            } 

        default:
            return state;
    }

}
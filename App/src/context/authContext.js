import React, { useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

let initialState = {
    Loading: true,
    isLogged: false,
    name: '',
    isAdmin: false,
    idUser: '',
    idPatient: '',
    namePatient: '',
    idMedic: '',
    nameMedic: '',
    update: false,
    email: '',
    crm: '',
    cpf: '',
    dateExame:'',
    nameMedic:'',
    description: ',',
    titleExam: ''
}

const reducer = (state, action) => {
    switch(action.type){
        case "logIn":
            return { ...state, isLogged: action.payload, Loading: false }
        case "logOut":
            AsyncStorage.removeItem("token");
            return { 
                ...state, 
                isLogged: false,
                isAdmin: false
            }
        case "verify":
            return { 
                ...state, 
                isLogged: true, 
                Loading: false, 
                idUser: action.payload.id, 
                isAdmin: action.payload.admin, 
                name: action.payload.name,
                email: action.payload.email,
                crm: action.payload.crm,
                cpf: action.payload.cpf
            }
        case "setMedic":
            return { 
                ...state, 
                idMedic: action.payload.id,
                nameMedic: action.payload.name                
            }
        case "setPatient":
            return { 
                ...state, 
                idPatient: action.payload
            }
        case "setExam":
                return { 
                    ...state, 
                    dateExame: action.payload.dateExam,
                    description: action.payload.description,
                    nameMedic: action.payload.nameMedic,
                    idExam: action.payload.id,
                    titleExam: action.payload.title
        }
        case "update":
            return {
                ...state,
                update: action.payload
            }
        default:
            return state
    }
}

export const Context = React.createContext();

export const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
    
}

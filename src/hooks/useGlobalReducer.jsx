import React, { useReducer, useContext, createContext } from "react"

const GlobalContext = createContext()

const initialState = {
    contactsArray: [],
    singleContact: null,
    todos: [] // Add this for compatibility with your existing code
}

const globalReducer = (state, action) => {
    console.log('Reducer action:', action.type, action.payload) // Debug log
    
    switch (action.type) {
        case "set-contact-list":
            return {
                ...state,
                contactsArray: action.payload || []
            }
        case "set-single-contact":
            return {
                ...state,
                singleContact: action.payload
            }
        case "clear-single-contact":
            return {
                ...state,
                singleContact: null
            }
        case "add-contact":
            return {
                ...state,
                contactsArray: [...state.contactsArray, action.payload]
            }
        case "update-contact":
            return {
                ...state,
                contactsArray: state.contactsArray.map(contact =>
                    contact.id === action.payload.id ? action.payload : contact
                )
            }
        case "delete-contact":
            return {
                ...state,
                contactsArray: state.contactsArray.filter(contact => contact.id !== action.payload)
            }
        case "add_task": // Keep this for compatibility with Demo component
            const { id, color } = action.payload
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === id ? { ...todo, background: color } : todo
                )
            }
        default:
            console.warn('Unknown action type:', action.type)
            return state
    }
}

export const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(globalReducer, initialState)

    console.log('Store Provider - Current state:', store) // Debug log

    return (
        <GlobalContext.Provider value={{ store, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

// Also export with other names for compatibility
export const GlobalProvider = StoreProvider

const useGlobalReducer = () => {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error("useGlobalReducer must be used within StoreProvider")
    }
    return context
}

export default useGlobalReducer
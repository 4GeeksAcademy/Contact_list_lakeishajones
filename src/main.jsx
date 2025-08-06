import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'  // Import the new styles
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { GlobalProvider } from './hooks/useGlobalReducer';  // Updated import name

const Main = () => {
    return (
        <React.StrictMode>  
            <GlobalProvider>  {/* Updated provider name */}
                <RouterProvider router={router} />
            </GlobalProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)

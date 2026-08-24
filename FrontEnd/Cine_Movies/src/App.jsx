import './App.css'
import Home from './Home'
import Loginpage from './Loginpage'
import ProtectedRoute from './ProtectedRoute'

import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'

const router1 = createBrowserRouter([
    {
        path: '/home',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        )
    },
    {
        path: '/',
        element: <Loginpage />
    }
])

function App() {
    return <RouterProvider router={router1} />
}

export default App
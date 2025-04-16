import React from 'react'
import Login from './Login';
import Browse from './Browse';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const Body = () => {
    const appRoutes = createBrowserRouter([
        {
            path:"/",
            element:<Login />
        },
        {
            path:"/browse",
            element:<Browse />
        }
    ]);

    return (
        <RouterProvider router={appRoutes} />
    )
}

export default Body
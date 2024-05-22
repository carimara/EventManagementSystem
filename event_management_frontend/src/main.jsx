import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login/Login.jsx";
import { Register } from "./components/Register/Register.jsx";
import { Events } from "./components/Events/Events.jsx";
import { EventDetail } from "./components/EventDetail/EventDetail.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import { AdminDashboard } from "./components/AdminDashboard/AdminDashboard.jsx";
import { OrganizerDashboard } from "./components/OrganizerDashboard/OrganizerDashboard.jsx";
import Home from "./components/Home/Home.jsx";
import { Booking } from "./components/Booking/Booking.jsx";
import { CreateEvent } from "./components/CreateEvent/CreateEvent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "events/:id",
        element: <EventDetail />,
      },
      {
        path: "booking",
        element: (
          <PrivateRoute
            element={<Events />}
            roles={["user", "organizer", "organizer"]}
          />
        ),
      },
      {
        path: "admin",
        element: (
          <PrivateRoute element={<AdminDashboard />} roles={["admin"]} />
        ),
      },
      {
        path: "organizer",
        element: (
          <PrivateRoute
            element={<OrganizerDashboard />}
            roles={["organizer", "admin"]}
          />
        ),
      },
      {
        path: "create-event",
        element: (
          <PrivateRoute
            element={<CreateEvent />}
            roles={["organizer", "admin"]}
          />
        ),
      },
      {
        path: "*",
        element: <div>Page not found</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

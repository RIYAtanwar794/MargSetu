import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Overview from "../pages/dashboard/Overview";
import Roadmaps from "../pages/dashboard/Roadmaps";
import Problems from "../pages/dashboard/Problems";
import Revision from "../pages/dashboard/Revision";
import Notes from "../pages/dashboard/Notes";
import Resources from "../pages/dashboard/Resources";
import Mentor from "../pages/dashboard/Mentor";
import Analytics from "../pages/dashboard/Analytics";
import Profile from "../pages/dashboard/Profile";
import RoadmapDetails from "../pages/dashboard/RoadmapDetails";
import TopicDetails from "../pages/dashboard/TopicDetails";


import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Landing */}
                <Route path="/" element={<Landing />} />

                {/* Authentication */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Overview />} />

                    <Route path="roadmaps" element={<Roadmaps />} />
                    <Route
                        path="roadmaps/:company"
                        element={<RoadmapDetails />}
                    />
                    <Route
                        path="roadmaps/:company/:topic"
                        element={<TopicDetails />}
                    />
                    <Route path="problems" element={<Problems />} />
                    <Route path="revision" element={<Revision />} />
                    <Route path="notes" element={<Notes />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="mentor" element={<Mentor />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="profile" element={<Profile />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
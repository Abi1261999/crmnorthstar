import { Navigate,Route,Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import DashboardPage from "./features/dashboard/DashboardPage";
import LeadsPage from "./features/leads/LeadsPage";
import PipelinePage from "./features/pipeline/PipelinePage";
import CustomersPage from "./features/customers/CustomersPage";
import TasksPage from "./features/tasks/TasksPage";
import ActivitiesPage from "./features/activities/ActivitiesPage";
export default function App(){return <Routes><Route element={<AppShell/>}><Route index element={<DashboardPage/>}/><Route path="leads" element={<LeadsPage/>}/><Route path="pipeline" element={<PipelinePage/>}/><Route path="customers" element={<CustomersPage/>}/><Route path="tasks" element={<TasksPage/>}/><Route path="activities" element={<ActivitiesPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>;}
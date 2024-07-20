import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6] ">
      <Routes>
        <Route element={<RootLayout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed/:trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/log-in" element={<Login />} />
        </Route>
      </Routes>

      <Toaster richColors expand={true} />
    </main>
  );
}

export default App;

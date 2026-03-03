import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import StudentLayout from "./layouts/StudentLayout";
import StudentHome from "./pages/student/StudentHome";
import StudyMaterials from "./pages/student/StudyMaterials";
import PracticePlatforms from "./pages/student/PracticePlatforms";
import LearningTools from "./pages/student/LearningTools";
import StudentProfile from "./pages/student/StudentProfile";

import TeacherLayout from "./layouts/TeacherLayout";
import TeacherHome from "./pages/teacher/TeacherHome";
import UploadMaterial from "./pages/teacher/UploadMaterial";
import TeacherFiles from "./pages/teacher/TeacherFiles";
import TeacherAnalytics from "./pages/teacher/TeacherAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>}>
              <Route index element={<StudentHome />} />
              <Route path="materials" element={<StudyMaterials />} />
              <Route path="platforms" element={<PracticePlatforms />} />
              <Route path="tools" element={<LearningTools />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>

            <Route path="/teacher" element={<ProtectedRoute allowedRole="teacher"><TeacherLayout /></ProtectedRoute>}>
              <Route index element={<TeacherHome />} />
              <Route path="upload" element={<UploadMaterial />} />
              <Route path="files" element={<TeacherFiles />} />
              <Route path="analytics" element={<TeacherAnalytics />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

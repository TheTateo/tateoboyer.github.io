import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { SkillsProvider } from "./context/SkillsContext";
import About from "./pages/About";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <SkillsProvider>
            <Routes>
              {/* Pages publiques : header + footer communs */}
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="a-propos" element={<About />} />
                <Route path="projets" element={<Projects />} />
                <Route path="competences" element={<Skills />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Administration */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          </SkillsProvider>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

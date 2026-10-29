import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { SkillsProvider } from "./context/SkillsContext";
import { CertificationsProvider } from "./context/CertificationsContext";
import { TimelineProvider } from "./context/TimelineContext";
import { TechnologiesProvider } from "./context/TechnologiesContext";
import About from "./pages/About";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import LegalNotices from "./pages/LegalNotices";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Timeline from "./pages/Timeline";

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToHash />
      <AuthProvider>
        <ProjectsProvider>
          <SkillsProvider>
            <TimelineProvider>
              <CertificationsProvider>
                <TechnologiesProvider>
                  <Routes>
                    {/* Pages publiques : header + footer communs */}
                    <Route element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="a-propos" element={<About />} />
                      <Route path="projets" element={<Projects />} />
                      <Route path="competences" element={<Skills />} />
                      <Route path="parcours" element={<Timeline />} />
                      <Route path="contact" element={<Contact />} />
                      <Route path="mentions-legales" element={<LegalNotices />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* Administration */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/admin" element={<Admin />} />
                    </Route>
                  </Routes>
                </TechnologiesProvider>
              </CertificationsProvider>
            </TimelineProvider>
          </SkillsProvider>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

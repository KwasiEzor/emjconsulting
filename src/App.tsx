import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { BackToTop, WhatsAppButton, CookieConsent } from './components/FloatingActions';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Destinations from './pages/Destinations';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageDestinations from './pages/admin/ManageDestinations';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageFaqs from './pages/admin/ManageFaqs';
import ManageBlog from './pages/admin/ManageBlog';
import ManageMessages from './pages/admin/ManageMessages';
import ManageAppointments from './pages/admin/ManageAppointments';
import ManageSubscribers from './pages/admin/ManageSubscribers';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicRoutes() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes location={location}>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><ManageServices /></ProtectedRoute>} />
        <Route path="/admin/destinations" element={<ProtectedRoute><ManageDestinations /></ProtectedRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedRoute><ManageTestimonials /></ProtectedRoute>} />
        <Route path="/admin/faqs" element={<ProtectedRoute><ManageFaqs /></ProtectedRoute>} />
        <Route path="/admin/blog" element={<ProtectedRoute><ManageBlog /></ProtectedRoute>} />
        <Route path="/admin/appointments" element={<ProtectedRoute><ManageAppointments /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><ManageMessages /></ProtectedRoute>} />
        <Route path="/admin/subscribers" element={<ProtectedRoute><ManageSubscribers /></ProtectedRoute>} />
      </Routes>
    );
  }

  return <PublicRoutes />;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <AppProvider>
        <LoadingScreen show={loading} />
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

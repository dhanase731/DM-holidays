import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {
  AboutPage,
  BlogPage,
  BlogPostPage,
  BookingPage,
  ContactPage,
  DestinationPage,
  EnquiryPage,
  FaqsPage,
  HomePage,
  LoginPage,
  NorthIndiaPage,
  PackagePage,
  SouthIndiaPage,
  SignupPage,
  TermsPage,
  PrivacyPage,
} from './pages';
import { AdminPage } from './AdminPage';
import { destinationDetails, packageDetails } from './siteData';
import { isLoggedIn } from './auth';

const destinationRoutes = Object.keys(destinationDetails);
const packageRoutes = Object.keys(packageDetails);

function ProtectedRoute({ children }) {
  const location = useLocation();
  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Auth pages — always accessible */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Static legal pages */}
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      {/* Admin — its own auth */}
      <Route path="/admin" element={<AdminPage />} />

      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
      <Route path="/faqs" element={<ProtectedRoute><FaqsPage /></ProtectedRoute>} />
      <Route path="/blog" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
      <Route path="/blog/:slug" element={<ProtectedRoute><BlogPostPage /></ProtectedRoute>} />
      <Route path="/blog-post.html" element={<ProtectedRoute><BlogPostPage /></ProtectedRoute>} />
      <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
      <Route path="/north-india" element={<ProtectedRoute><NorthIndiaPage /></ProtectedRoute>} />
      <Route path="/south-india" element={<ProtectedRoute><SouthIndiaPage /></ProtectedRoute>} />
      <Route path="/enquiry" element={<ProtectedRoute><EnquiryPage /></ProtectedRoute>} />

      {destinationRoutes.map((slug) => (
        <Route key={slug} path={`/destinations/${slug}`} element={<ProtectedRoute><DestinationPage /></ProtectedRoute>} />
      ))}
      {packageRoutes.map((slug) => (
        <Route key={slug} path={`/packages/${slug}`} element={<ProtectedRoute><PackagePage /></ProtectedRoute>} />
      ))}

      {/* HTML redirects */}
      <Route path="/About.html" element={<Navigate to="/about" replace />} />
      <Route path="/faqs.html" element={<Navigate to="/faqs" replace />} />
      <Route path="/blog.html" element={<Navigate to="/blog" replace />} />
      <Route path="/Booking.html" element={<Navigate to="/booking" replace />} />
      <Route path="/Contact.html" element={<Navigate to="/contact" replace />} />
      <Route path="/north-india.html" element={<Navigate to="/north-india" replace />} />
      <Route path="/south-india.html" element={<Navigate to="/south-india" replace />} />
      <Route path="/login.html" element={<Navigate to="/login" replace />} />
      <Route path="/signup.html" element={<Navigate to="/signup" replace />} />

      {destinationRoutes.map((slug) => (
        <Route key={`${slug}.html`} path={`/${slug}.html`} element={<Navigate to={`/destinations/${slug}`} replace />} />
      ))}
      {packageRoutes.map((slug) => (
        <Route key={`${slug}.html`} path={`/${slug}.html`} element={<Navigate to={`/packages/${slug}`} replace />} />
      ))}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

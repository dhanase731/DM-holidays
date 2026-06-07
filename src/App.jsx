import { Navigate, Route, Routes } from 'react-router-dom';
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
} from './pages';
import { AdminPage } from './AdminPage';
import { destinationDetails, packageDetails } from './siteData';

const destinationRoutes = Object.keys(destinationDetails);
const packageRoutes = Object.keys(packageDetails);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faqs" element={<FaqsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/blog-post.html" element={<BlogPostPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/north-india" element={<NorthIndiaPage />} />
      <Route path="/south-india" element={<SouthIndiaPage />} />
      <Route path="/enquiry" element={<EnquiryPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {destinationRoutes.map((slug) => (
        <Route key={slug} path={`/destinations/${slug}`} element={<DestinationPage />} />
      ))}
      {packageRoutes.map((slug) => (
        <Route key={slug} path={`/packages/${slug}`} element={<PackagePage />} />
      ))}

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

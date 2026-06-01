import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export function useBodyClass(...classes) {
  const bodyClassName = classes.filter(Boolean).join(' ');

  useEffect(() => {
    if (!bodyClassName) return undefined;

    const previous = document.body.className;
    document.body.className = bodyClassName;

    return () => {
      document.body.className = previous;
    };
  }, [bodyClassName]);
}

function DropdownMenu({ label, items, active, variant }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search, location.hash]);

  return (
    <li
      className={`nav-item dropdown hover-dropdown ${open ? 'show' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`nav-link dropdown-toggle btn btn-link p-0 border-0 ${active ? 'active' : ''}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {label}
      </button>
      <ul className={`dropdown-menu simple-menu ${open ? 'show' : ''} ${variant ?? ''}`}>
        {items.map((item) => (
          <li key={item.to}>
            <Link className="dropdown-item" to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function SiteNavbar({ variant = 'default' }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const companyActive = ['/about', '/faqs', '/blog'].some((path) => location.pathname.startsWith(path));
  const indiaActive = ['/north-india', '/south-india', '/destinations', '/packages'].some((path) =>
    location.pathname.startsWith(path),
  );
  const contactActive = ['/contact', '/booking'].some((path) => location.pathname.startsWith(path));

  const navClassName = variant === 'locations' ? 'locations-nav' : 'site-nav';

  return (
    <nav className={`navbar navbar-expand-lg navbar-light sticky-top ${navClassName}`}>
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">
          DM Holidays
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="mainNav">
          <ul className="navbar-nav ms-auto gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <DropdownMenu
              label="Company"
              active={companyActive}
              items={[
                { to: '/about', label: 'About' },
                { to: '/faqs', label: 'FAQs' },
                { to: '/blog', label: 'Blog' },
              ]}
            />
            <DropdownMenu
              label="India"
              active={indiaActive}
              items={[
                { to: '/north-india', label: 'North India' },
                { to: '/south-india', label: 'South India' },
              ]}
            />
            <DropdownMenu
              label="Contact"
              active={contactActive}
              items={[
                { to: '/booking#contact', label: 'Contact Us' },
                { to: '/contact', label: 'Our Locations' },
              ]}
            />
            <li className="nav-item ms-lg-2">
              <NavLink className="btn nav-cta" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter({ fullBleed = false }) {
  return (
    <footer className={`site-footer text-light py-5 ${fullBleed ? 'full-bleed' : ''}`}>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h4>Corporate Office</h4>
            <hr />
            <p className="mb-0">
              DM Holidays Pvt LTD,<br />Novel Tech Park,<br />Opposite to 1 MG Mall,<br />MG Road, Bangalore – 560042
              <br />Karnataka, India.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <h4>Head Office</h4>
            <hr />
            <p className="mb-0">
              DM Holidays Pvt LTD,<br />No.1, Gemini Parsn,<br />Kodambakkam High Road,<br />Nungambakkam, Chennai –
              600006<br />Tamil Nadu, India.
            </p>
          </div>
          <div className="col-12 col-md-4" />

          <div className="row g-4 mt-4 pt-4 footer-contact">
            <div className="col-12 col-md-4">
              <small>Call Us</small>
              <h5 className="mb-0">+91 9790831205</h5>
            </div>
            <div className="col-12 col-md-4">
              <small>Email Us</small>
              <h5 className="mb-0">mail@dmholidays.in</h5>
            </div>
            <div className="col-12 col-md-4">
              <small>Follow Us</small>
              <div className="social-row mt-2">
                <span>f</span>
                <span>◎</span>
                <span>in</span>
                <span>▶</span>
                <span>G</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PackageGallery({ images, alt }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  useEffect(() => {
    setActiveImage(images[0]);
  }, [images]);

  return (
    <>
      <img className="pkg-hero-img" src={activeImage} alt={alt} />
      <div className="pkg-thumb-row">
        {images.map((image) => (
          <img
            key={image}
            className={`pkg-thumb ${activeImage === image ? 'active' : ''}`}
            src={image}
            alt={alt}
            onClick={() => setActiveImage(image)}
          />
        ))}
      </div>
    </>
  );
}

export function HeroCarousel({ slides, activeIndex, onChange }) {
  return (
    <div className="carousel slide carousel-fade">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div key={slide.alt} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
            <img src={slide.image} className="d-block w-100 hero-image" alt={slide.alt} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" onClick={() => onChange((activeIndex + slides.length - 1) % slides.length)}>
        <span className="carousel-control-prev-icon" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" onClick={() => onChange((activeIndex + 1) % slides.length)}>
        <span className="carousel-control-next-icon" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
